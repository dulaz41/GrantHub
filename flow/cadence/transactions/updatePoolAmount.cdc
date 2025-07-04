import GrantHub from 0xb9b9e5ad5de42ef6

transaction(poolId: UInt64, newAmount: UFix64) {
    prepare(acct: auth(Storage) &Account) {
        GrantHub.updatePoolAmount(id: poolId, newAmount: newAmount, caller: acct.address)
        log("Updated pool amount")
    }
}
