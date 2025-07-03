import GrantHub from 0x4bccd1931d30027a
import FungibleToken from 0x9a0766d93b6608b7
import FlowToken from 0x7e60df042a9c0868

transaction(proposalCreator: Address, proposalId: UInt64, amount: UFix64) {
    prepare(acct: auth(Storage) &Account) {
        let identifier = "GrantHubProposal_".concat(proposalId.toString())
        let proposalPublicPath = PublicPath(identifier: identifier)
        
        if proposalPublicPath == nil {
            panic("Failed to construct public path for proposal ID: ".concat(proposalId.toString()))
        }

        let proposalCap = getAccount(proposalCreator).capabilities.get<&GrantHub.Proposal>(proposalPublicPath!)
        let proposalRef = proposalCap.borrow()
            ?? panic("Could not borrow reference to proposal")

        let vaultRef = acct.storage.borrow<auth(FungibleToken.Withdraw) &FlowToken.Vault>(from: /storage/flowTokenVault)
            ?? panic("No FlowToken vault found in storage")

        let payment <- vaultRef.withdraw(amount: amount)

        proposalRef.fund(from: <-payment, funder: acct.address)

        log("Successfully funded proposal ID: ".concat(proposalId.toString()))
    }

    execute {
        log("Transaction executed successfully")
    }
}