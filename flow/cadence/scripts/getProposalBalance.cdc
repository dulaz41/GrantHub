import GrantHub from 0x507dc1ab87c6636f

access(all) fun main(proposalId: UInt64): UFix64 {
    return GrantHub.getProposalBalance(proposalId: proposalId)
}
