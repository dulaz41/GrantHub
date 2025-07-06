import GrantHub from 0xb9b9e5ad5de42ef6
import FungibleToken from 0x9a0766d93b6608b7

transaction(proposalId: UInt64, milestoneId: UInt64, recipient: Address) {
    prepare(acct: auth(Storage) &Account) {
        let proposalRef = GrantHub.getProposalRef(id: proposalId, acct: acct)
            ?? panic("Proposal not found")

        let recipientAcct = getAccount(recipient)
        let receiverRef = recipientAcct.capabilities.borrow<&{FungibleToken.Receiver}>(/public/flowTokenReceiver)
            ?? panic("Recipient has no FlowToken receiver")

        proposalRef.releaseMilestone(milestoneId: milestoneId, recipient: receiverRef)
        log("Released milestone ".concat(milestoneId.toString()))
    }
}
