import FungibleToken from 0x9a0766d93b6608b7
import FlowToken from 0x7e60df042a9c0868
import NonFungibleToken from 0x631e88ae7f1d7c20

access(all) contract GrantHub {

    access(all) let FgrantPublicPath: PublicPath
    access(all) let FgrantPrivatePath: PrivatePath
    access(all) let FgrantStoragePath: StoragePath

    access(all) var proposalCounter: UInt64
    access(all) var poolCounter: UInt64 
    access(all) var adminRole: AdminRole?

    access(all) var proposalPaths: {UInt64: StoragePath}
    access(all) var poolPaths: {UInt64: StoragePath}

    access(all) var communityPool: @{FungibleToken.Vault}

    access(all) struct ProposalMeta {
        access(all) let id: UInt64
        access(all) let proposer: Address?
        access(all) let name: String
        access(all) let projectName: String
        access(all) let coverDescription: String
        access(all) let fundingGoal: UFix64

        init(
            id: UInt64,
            proposer: Address?,
            name: String,
            projectName: String,
            coverDescription: String,
            fundingGoal: UFix64
        ) {
            self.id = id
            self.proposer = proposer
            self.name = name
            self.projectName = projectName
            self.coverDescription = coverDescription
            self.fundingGoal = fundingGoal
        }
    }
    access(all) var proposalMetas: {UInt64: ProposalMeta}

    access(all) event ProposalCreated(id: UInt64, from: Address?, name: String, projectName: String, description: String, amount: UFix64)
    access(all) event ProposalFunded(id: UInt64, acct: Address?, amount: UFix64)
    access(all) event ProposalFundingCompleted(id: UInt64)
    access(all) event PoolCreated(poolID: UInt64, proposalId: UInt64, from: Address?, amount: UFix64)
    access(all) event PoolFundingCompleted(amount: UFix64, from: Address?)
    access(all) event ProposalFundsWithdrawn(id: UInt64, from: Address?, amount: UFix64)
    access(all) event MilestoneReleased(proposalId: UInt64, milestoneId: UInt64, amount: UFix64)
    access(all) event ContractInitialized()
    access(all) event CommunityPoolWithdrawal(proposalId: UInt64, to: Address, amount: UFix64)

    access(all) struct AdminRole {
        access(all) var adminAddress: Address
        init(admin: Address) {
            self.adminAddress = admin
        }
        access(all) fun isAdmin(addr: Address): Bool {
            return addr == self.adminAddress
        }
    }

    access(all) struct Milestone {
        access(all) let id: UInt64
        access(all) let name: String
        access(all) let description: String
        access(all) let amount: UFix64
        access(all) let deadline: UFix64
        access(contract) var released: Bool

        init(
            _id: UInt64,
            _name: String,
            _description: String,
            _amount: UFix64,
            _deadline: UFix64
        ) {
            self.id = _id
            self.name = _name
            self.description = _description
            self.amount = _amount
            self.deadline = _deadline
            self.released = false
        }

        access(all) fun markReleased() {
            self.released = true
        }
    }

    access(all) resource Proposal {
        access(all) let id: UInt64
        access(all) let proposer: Address?
        access(all) var name: String
        access(all) var projectName: String
        access(all) var coverDescription: String
        access(all) var projectDescription: String
        access(all) var fundingGoal: UFix64
        access(all) var fundingCompleted: Bool
        access(all) var funders: {Address: Bool}
        access(all) var milestones: {UInt64: Milestone}
        access(all) var nextMilestoneId: UInt64
        access(all) var vault: @{FungibleToken.Vault}

        init(
            _id: UInt64,
            _proposer: Address?,
            _name: String,
            _projectName: String,
            _coverDescription: String,
            _projectDescription: String,
            _fundingGoal: UFix64
        ) {
            self.id = _id
            self.proposer = _proposer
            self.name = _name
            self.projectName = _projectName
            self.coverDescription = _coverDescription
            self.projectDescription = _projectDescription
            self.fundingGoal = _fundingGoal
            self.fundingCompleted = false
            self.funders = {}
            self.milestones = {}
            self.nextMilestoneId = 1
            self.vault <- FlowToken.createEmptyVault(vaultType: Type<@FlowToken.Vault>())
        }

        access(all) fun fund(from: @{FungibleToken.Vault}, funder: Address) {
            if self.fundingCompleted {
                destroy from
                panic("Funding goal already reached. No more funds accepted.")
            }
            let amount = from.balance
            self.vault.deposit(from: <- from)
            self.funders[funder] = true

            if self.vault.balance >= self.fundingGoal {
                self.fundingCompleted = true
                emit ProposalFundingCompleted(id: self.id)
            }
            emit ProposalFunded(id: self.id, acct: funder, amount: amount)
        }

        access(all) fun createMilestone(name: String, description: String, amount: UFix64, deadline: UFix64): UInt64 {
            let milestoneId = self.nextMilestoneId
            self.nextMilestoneId = self.nextMilestoneId + 1
            let milestone = Milestone(
                _id: milestoneId,
                _name: name,
                _description: description,
                _amount: amount,
                _deadline: deadline
            )
            self.milestones[milestoneId] = milestone
            return milestoneId
        }

        access(all) fun releaseMilestone(milestoneId: UInt64, recipient: &{FungibleToken.Receiver}) {
            let milestone = self.milestones[milestoneId] ?? panic("Milestone not found")
            if milestone.released {
                panic("Milestone already released")
            }
            if self.vault.balance < milestone.amount {
                panic("Not enough funds to release milestone")
            }
            let now = getCurrentBlock().timestamp / 1_000_000_000.0
            if now < milestone.deadline {
                panic("Milestone deadline has not passed yet")
            }

            milestone.markReleased()
            self.milestones[milestoneId] = milestone
            let payout <- self.vault.withdraw(amount: milestone.amount)
            recipient.deposit(from: <- payout)
            emit MilestoneReleased(proposalId: self.id, milestoneId: milestoneId, amount: milestone.amount)
        }

        access(all) fun withdraw(receiver: &{FungibleToken.Receiver}, amount: UFix64, caller: Address) {
            if caller != self.proposer && !(GrantHub.adminRole?.isAdmin(addr: caller) == true) {
                panic("Only proposer or admin can withdraw")
            }

            if amount > self.vault.balance {
                panic("Amount exceeds available balance")
            }
            let payout <- self.vault.withdraw(amount: amount)
            receiver.deposit(from: <- payout)
        }
    }
