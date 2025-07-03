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
