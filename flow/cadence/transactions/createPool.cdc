import GrantHub from 0xb9b9e5ad5de42ef6

transaction(proposalId: UInt64, amount: UFix64) {
    prepare(acct:auth(Storage) &Account) {
        let id = GrantHub.createPool(
            poolCreator: acct.address,
            proposalId: proposalId,
            amount: amount
        )
        log("Created pool with id ".concat(id.toString()))
    }
}
