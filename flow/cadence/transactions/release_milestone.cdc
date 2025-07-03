import GrantHub from 0x4bccd1931d30027a
import FungibleToken from 0x9a0766d93b6608b7

transaction(proposalId: UInt64, milestoneId: UInt64, recipient: Address) {
    prepare(acct: auth(Storage) &Account) {
        let manager <- GrantHub.createProposalManager()
        let proposalRef = manager.getProposalRef(id: proposalId, acct: acct)
            ?? panic("Proposal not found")

        let recipientAcct = getAccount(recipient)
        let receiverRef = recipientAcct.capabilities.borrow<&{FungibleToken.Receiver}>(/public/flowTokenReceiver)
            ?? panic("Recipient has no FlowToken receiver")

        proposalRef.releaseMilestone(milestoneId: milestoneId, recipient: receiverRef)
        destroy manager
        log("Released milestone ".concat(milestoneId.toString()))
    }
}
