import FungibleToken from 0x9a0766d93b6608b7
import FlowToken from 0x7e60df042a9c0868

access(all) contract GrantHub {

    access(all) var proposalCounter: UInt64
    access(all) var poolCounter: UInt64 
    access(all) var adminRole: AdminRole?
    access(all) var proposals: @{UInt64: Proposal}
    access(all) var pools: @{UInt64: Pool}
    access(all) var proposalMetas: {UInt64: ProposalMeta}
    access(all) var poolMetas: {UInt64: PoolMeta}
    access(all) var communityPool: @{FungibleToken.Vault}

    access(all) event ProposalCreated(id: UInt64, from: Address, name: String, projectName: String, description: String, amount: UFix64)
    access(all) event ProposalFunded(id: UInt64, acct: Address, amount: UFix64)
    access(all) event ProposalFundingCompleted(id: UInt64)
    access(all) event PoolCreated(poolID: UInt64, proposalId: UInt64, from: Address, amount: UFix64)
    access(all) event PoolFundingCompleted(amount: UFix64, from: Address)
    access(all) event ProposalFundsWithdrawn(id: UInt64, from: Address, amount: UFix64)
    access(all) event MilestoneReleased(proposalId: UInt64, milestoneId: UInt64, amount: UFix64)
    access(all) event ContractInitialized()
    access(all) event CommunityPoolWithdrawal(proposalId: UInt64, to: Address, amount: UFix64)

    access(all) struct ProposalMeta {
        access(all) let id: UInt64
        access(all) let proposer: Address
        access(all) let name: String
        access(all) let projectName: String
        access(all) let coverDescription: String
        access(all) let fundingGoal: UFix64
        access(all) var fundingCompleted: Bool

        init(
            id: UInt64,
            proposer: Address,
            name: String,
            projectName: String,
            coverDescription: String,
            fundingGoal: UFix64,
            fundingCompleted: Bool
        ) {
            self.id = id
            self.proposer = proposer
            self.name = name
            self.projectName = projectName
            self.coverDescription = coverDescription
            self.fundingGoal = fundingGoal
            self.fundingCompleted = fundingCompleted
        }
    }

    access(all) struct PoolMeta {
        access(all) let id: UInt64
        access(all) let proposalId: UInt64
        access(all) let poolCreator: Address
        access(all) let amount: UFix64

        init(
            id: UInt64,
            proposalId: UInt64,
            poolCreator: Address,
            amount: UFix64
        ) {
            self.id = id
            self.proposalId = proposalId
            self.poolCreator = poolCreator
            self.amount = amount
        }
    }

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
        access(all) let proposer: Address
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
            _proposer: Address,
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

        access(all) fun setName(newName: String) {
            self.name = newName
        }

        access(all) fun fund(from: @{FungibleToken.Vault}, funder: Address) {
            if self.fundingCompleted {
                destroy from
                panic("Funding goal already reached. No more funds accepted.")
            } else {
                let amount = from.balance
                self.vault.deposit(from: <- from)
                self.funders[funder] = true

                if self.vault.balance >= self.fundingGoal {
                    self.fundingCompleted = true
                    let oldMeta = GrantHub.proposalMetas[self.id]!
                    let newMeta = ProposalMeta(
                        id: oldMeta.id,
                        proposer: oldMeta.proposer,
                        name: oldMeta.name,
                        projectName: oldMeta.projectName,
                        coverDescription: oldMeta.coverDescription,
                        fundingGoal: oldMeta.fundingGoal,
                        fundingCompleted: true
                    )
                    GrantHub.proposalMetas[self.id] = newMeta
                    emit ProposalFundingCompleted(id: self.id)
                }
                emit ProposalFunded(id: self.id, acct: funder, amount: amount)
            }
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
            emit ProposalFundsWithdrawn(id: self.id, from: caller, amount: amount)
        }
    }

    access(all) resource Pool {
        access(all) let id: UInt64
        access(all) let proposalId: UInt64
        access(all) let poolCreator: Address
        access(all) var amount: UFix64

        init(
            _id: UInt64,
            _proposalId: UInt64,
            _poolCreator: Address,
            _amount: UFix64
        ) {
            self.id = _id
            self.proposalId = _proposalId
            self.poolCreator = _poolCreator
            self.amount = _amount
        }

        access(all) fun setAmount(newAmount: UFix64) {
            self.amount = newAmount
        }

        access(all) fun fund(from: @{FungibleToken.Vault}) {
            let depositAmount = from.balance
            destroy from
            self.amount = self.amount + depositAmount
            emit PoolCreated(poolID: self.id, proposalId: self.proposalId, from: self.poolCreator, amount: self.amount)
        }
    }

    access(all) fun createProposal(
        proposer: Address,
        name: String,
        projectName: String,
        coverDescription: String,
        projectDescription: String,
        fundingGoal: UFix64
    ): UInt64 {
        self.proposalCounter = self.proposalCounter + 1
        let id = self.proposalCounter
        let proposal <- create Proposal(
            _id: id,
            _proposer: proposer,
            _name: name,
            _projectName: projectName,
            _coverDescription: coverDescription,
            _projectDescription: projectDescription,
            _fundingGoal: fundingGoal
        )
        self.proposals[id] <-! proposal

        let meta = ProposalMeta(
            id: id,
            proposer: proposer,
            name: name,
            projectName: projectName,
            coverDescription: coverDescription,
            fundingGoal: fundingGoal,
            fundingCompleted: false
        )
        self.proposalMetas[id] = meta

        emit ProposalCreated(
            id: id,
            from: proposer,
            name: name,
            projectName: projectName,
            description: coverDescription,
            amount: fundingGoal
        )
        return id
    }

    access(all) fun getProposalRef(id: UInt64): &Proposal? {
        if self.proposals[id] == nil {
            return nil
        }
        return (&self.proposals[id] as &Proposal?)
    }

    access(all) fun proposalExists(id: UInt64): Bool {
        return self.proposals[id] != nil
    }

    access(all) fun createPool(
        poolCreator: Address,
        proposalId: UInt64,
        amount: UFix64
    ): UInt64 {
        self.poolCounter = self.poolCounter + 1
        let id = self.poolCounter
        let pool <- create Pool(
            _id: id,
            _proposalId: proposalId,
            _poolCreator: poolCreator,
            _amount: amount
        )
        self.pools[id] <-! pool

        let meta = PoolMeta(
            id: id,
            proposalId: proposalId,
            poolCreator: poolCreator,
            amount: amount
        )
        self.poolMetas[id] = meta

        emit PoolCreated(poolID: id, proposalId: proposalId, from: poolCreator, amount: amount)
        return id
    }

    access(all) fun getPoolRef(id: UInt64): &Pool? {
        if self.pools[id] == nil {
            return nil
        }
        return (&self.pools[id] as &Pool?)
    }

    access(all) fun poolExists(id: UInt64): Bool {
        return self.pools[id] != nil
    }

    access(all) fun updateProposalName(id: UInt64, newName: String, caller: Address) {
        let proposalRef = self.getProposalRef(id: id) ?? panic("Proposal not found")
        if proposalRef.proposer != caller && !(self.adminRole?.isAdmin(addr: caller) == true) {
            panic("Only proposer or admin can update proposal")
        }
        proposalRef.setName(newName: newName)
    }

    access(all) fun updatePoolAmount(id: UInt64, newAmount: UFix64, caller: Address) {
        let poolRef = self.getPoolRef(id: id) ?? panic("Pool not found")
        if poolRef.poolCreator != caller && !(self.adminRole?.isAdmin(addr: caller) == true) {
            panic("Only pool creator or admin can update pool")
        }
        poolRef.setAmount(newAmount: newAmount)
    }

    access(all) fun fundProposal(proposalId: UInt64, from: @{FungibleToken.Vault}, funder: Address) {
        let proposalRef = self.getProposalRef(id: proposalId) ?? panic("Proposal not found")
        proposalRef.fund(from: <- from, funder: funder)
    }

    access(all) fun fundCommunityPool(from: @{FungibleToken.Vault}, fromAddress: Address) {
        let amount = from.balance
        self.communityPool.deposit(from: <- from)
        emit PoolFundingCompleted(amount: amount, from: fromAddress)
    }

    access(all) fun withdrawFromCommunityPool(
        proposalId: UInt64,
        to: &{FungibleToken.Receiver},
        amount: UFix64,
        caller: Address
    ) {
        let proposalRef = self.getProposalRef(id: proposalId) ?? panic("Proposal not found")
        let isAuthorized = (proposalRef.proposer == caller) || (self.adminRole?.isAdmin(addr: caller) == true)
        if !isAuthorized {
            panic("Not authorized to withdraw for this proposal")
        }
        if amount > self.communityPool.balance {
            panic("Not enough funds in community pool")
        }
        let payout <- self.communityPool.withdraw(amount: amount)
        to.deposit(from: <- payout)
        emit CommunityPoolWithdrawal(proposalId: proposalId, to: caller, amount: amount)
    }

    access(all) fun setAdmin(newAdmin: Address) {
        if self.adminRole == nil || self.adminRole!.isAdmin(addr: self.account.address) {
            self.adminRole = AdminRole(admin: newAdmin)
        } else {
            panic("Only current admin can change admin role")
        }
    }

    access(all) fun getProposalBalance(proposalId: UInt64): UFix64 {
        let proposalRef = self.getProposalRef(id: proposalId) 
            ?? panic("Proposal not found")
        return proposalRef.vault.balance
    }

    access(all) fun getAllProposalMetas(): [ProposalMeta] {
        return self.proposalMetas.values
    }

    access(all) fun getAllPoolMetas(): [PoolMeta] {
        return self.poolMetas.values
    }

    init() {
        self.proposalCounter = 0
        self.poolCounter = 0
        self.proposals <- {}
        self.pools <- {}
        self.proposalMetas = {}
        self.poolMetas = {}
        self.adminRole = AdminRole(admin: self.account.address)
        self.communityPool <- FlowToken.createEmptyVault(vaultType: Type<@FlowToken.Vault>())
        emit ContractInitialized()
    }
}
