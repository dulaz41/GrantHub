import GrantHub from 0x4bccd1931d30027a

access(all) fun main(account: Address, proposalId: UInt64): Bool {
    let publicPath = PublicPath(identifier: "GrantHubProposal_".concat(proposalId.toString()))!
    let cap = getAccount(account).capabilities.get<&GrantHub.Proposal>(publicPath)
    let proposalRef = cap.borrow()
    return proposalRef != nil
}
