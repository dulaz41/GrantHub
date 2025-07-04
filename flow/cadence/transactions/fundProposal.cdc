import GrantHub from 0xb9b9e5ad5de42ef6
import FungibleToken from 0x9a0766d93b6608b7
import FlowToken from 0x7e60df042a9c0868

transaction(proposalId: UInt64, amount: UFix64) {
    prepare(acct: auth(Storage) &Account) {
        let vaultRef = acct.storage.borrow<auth(FungibleToken.Withdraw) &FlowToken.Vault>(from: /storage/flowTokenVault)
            ?? panic("No FlowToken vault found in storage")
        let payment <- vaultRef.withdraw(amount: amount)
        GrantHub.fundProposal(proposalId: proposalId, from: <- payment, funder: acct.address)
    }

    execute {
        log("Transaction executed successfully")
    }
}
