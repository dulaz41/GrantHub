import GrantHub from 0x4bccd1931d30027a

access(all) fun main(proposalId: UInt64): UFix64 {
    return GrantHub.getProposalBalance(proposalId: proposalId)
}
