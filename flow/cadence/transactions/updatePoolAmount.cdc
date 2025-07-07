import GrantHub from 0x507dc1ab87c6636f

transaction(poolId: UInt64, newAmount: UFix64) {
    prepare(acct: auth(Storage) &Account) {
        GrantHub.updatePoolAmount(id: poolId, newAmount: newAmount, caller: acct.address)
        log("Updated pool amount")
    }
}
