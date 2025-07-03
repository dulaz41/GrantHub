import GrantHub from 0x4bccd1931d30027a

access(all) fun main(proposalId: UInt64, milestoneId: UInt64, acct: Address): {String: AnyStruct} {
    let account = getAuthAccount<auth(BorrowValue) &Account>(acct)
    let proposalPath = StoragePath(identifier: "GrantHubProposal_".concat(proposalId.toString()))!
    let proposalRef = account.storage.borrow<&GrantHub.Proposal>(from: proposalPath)
        ?? panic("Proposal not found")
    let milestone = proposalRef.milestones[milestoneId]!
    let info: {String: AnyStruct} = {
        "id": milestone.id,
        "name": milestone.name,
        "description": milestone.description,
        "amount": milestone.amount,
        "deadline": milestone.deadline,
        "released": milestone.released
    }
    
    return info
}
