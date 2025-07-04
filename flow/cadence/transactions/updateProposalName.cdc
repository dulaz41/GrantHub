import GrantHub from 0xb9b9e5ad5de42ef6

transaction(proposalId: UInt64, newName: String) {
    prepare(acct: auth(Storage) &Account) {
        GrantHub.updateProposalName(id: proposalId, newName: newName, caller: acct.address)
        log("Updated proposal name")
    }
}
