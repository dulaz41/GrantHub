import FlowToken from 0x7e60df042a9c0868
import FungibleToken from 0x9a0766d93b6608b7

access(all) fun main(account: Address): Bool {
    let acct = getAccount(account)
    let cap = acct.capabilities.get<&{FungibleToken.Balance}>(/public/flowTokenBalance)
    let vaultRef = cap.borrow()
    return vaultRef != nil
}
