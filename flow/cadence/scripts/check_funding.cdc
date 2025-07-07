import GrantHub from 0xb9b9e5ad5de42ef6

access(all) fun main(proposalId: UInt64): Bool {
    let proposalRef = GrantHub.getProposalRef(id: proposalId)
        ?? panic("Proposal not found")
    
    return proposalRef.fundingCompleted
}
