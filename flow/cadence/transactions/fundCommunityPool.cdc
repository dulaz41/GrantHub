import GrantHub from 0x4bccd1931d30027a
import FungibleToken from 0x9a0766d93b6608b7
import FlowToken from 0x7e60df042a9c0868

transaction(amount: UFix64) {
    // The Vault resource to withdraw from
    let sentVault: @FungibleToken.Vault

    prepare(signer: auth(Storage) &Account) {
        // Withdraw the specified amount from the signer's FlowToken vault
        let vaultRef = signer.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)
            ?? panic("Could not borrow reference to the signer's FlowToken vault")
        self.sentVault <- vaultRef.withdraw(amount: amount)
    }

    execute {
        // Fund the community pool
        GrantHub.fundCommunityPool(from: <-self.sentVault, fromAddress: signer.address)
    }
}
