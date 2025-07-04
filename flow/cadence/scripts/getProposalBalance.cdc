import GrantHub from 0xb9b9e5ad5de42ef6

access(all) fun main(proposalId: UInt64): UFix64 {
    return GrantHub.getProposalBalance(proposalId: proposalId)
}
