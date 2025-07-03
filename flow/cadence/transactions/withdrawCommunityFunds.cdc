import GrantHub from 0x4bccd1931d30027a
import FungibleToken from 0x9a0766d93b6608b7
import FlowToken from 0x7e60df042a9c0868

transaction(proposalId: UInt64, amount: UFix64) {
    prepare(signer: auth(Storage) &Account) {
        let receiver = let receiver = signer.capabilities.borrow<&{FungibleToken.Receiver}>(/public/flowTokenReceiver)
         ?? panic("Could not borrow receiver reference")

        GrantHub.withdrawFromCommunityPool(
            proposalId,
            receiver,
            amount,
            signer.address
        )
    }
}
