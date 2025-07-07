import GrantHub from 0x507dc1ab87c6636f

access(all) fun main(proposalId: UInt64): Bool {
    let proposalRef = GrantHub.getProposalRef(id: proposalId)
        ?? panic("Proposal not found")
    
    return proposalRef.fundingCompleted
}
