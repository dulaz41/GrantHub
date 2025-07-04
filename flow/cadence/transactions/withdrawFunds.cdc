import GrantHub from 0xb9b9e5ad5de42ef6
import FungibleToken from 0x9a0766d93b6608b7

transaction(proposalId: UInt64, amount: UFix64) {
    prepare(acct: auth(Storage) &Account) {
        let manager <- GrantHub.createProposalManager()
        let proposalRef = manager.getProposalRef(id: proposalId, acct: acct)
            ?? panic("Proposal not found")

        let receiverRef = acct.capabilities.borrow<&{FungibleToken.Receiver}>(/public/flowTokenReceiver)
            ?? panic("No FlowToken receiver in account")

        proposalRef.withdraw(receiverRef, amount, acct.address)
        destroy manager
        log("Withdrew ".concat(amount.toString()).concat(" from proposal ").concat(proposalId.toString()))
    }
}
