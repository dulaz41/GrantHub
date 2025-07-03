import GrantHub from 0x4bccd1931d30027a

transaction(
    proposalId: UInt64,
    name: String,
    description: String,
    amount: UFix64,
    deadline: UFix64
) {
    prepare(acct: auth(Storage) &Account) {
        let manager <- GrantHub.createProposalManager()
        let proposalRef = manager.getProposalRef(id: proposalId, acct: acct)
            ?? panic("Proposal not found")
        let milestoneId = proposalRef.createMilestone(
            name,
            description,
            amount,
            deadline
        )

        destroy manager
        log("Created milestone with ID ".concat(milestoneId.toString()))
    }
}
