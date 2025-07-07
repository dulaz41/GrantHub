import GrantHub from 0x507dc1ab87c6636f

transaction(proposalId: UInt64, newName: String) {
    prepare(acct: auth(Storage) &Account) {
        GrantHub.updateProposalName(id: proposalId, newName: newName, caller: acct.address)
        log("Updated proposal name")
    }
}
