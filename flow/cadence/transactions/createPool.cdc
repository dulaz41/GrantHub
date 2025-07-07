import GrantHub from 0x507dc1ab87c6636f

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
