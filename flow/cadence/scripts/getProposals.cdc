import GrantHub from 0x4bccd1931d30027a

access(all) fun main(proposalId: UInt64, acct: Address): {String: AnyStruct} {
    let account = getAuthAccount<auth(BorrowValue) &Account>(acct)
    let proposalPath = StoragePath(identifier: "GrantHubProposal_".concat(proposalId.toString()))!
    let proposalRef = account.storage.borrow<&GrantHub.Proposal>(from: proposalPath)
        ?? panic("Proposal not found")
    let info: {String: AnyStruct} = {
        "id": proposalRef.id,
        "proposer": proposalRef.proposer,
        "name": proposalRef.name,
        "projectName": proposalRef.projectName,
        "coverDescription": proposalRef.coverDescription,
        "projectDescription": proposalRef.projectDescription,
        "fundingGoal": proposalRef.fundingGoal,
        "fundingCompleted": proposalRef.fundingCompleted,
        "balance": proposalRef.vault.balance
    }
    return info
}
