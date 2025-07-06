import GrantHub from 0xb9b9e5ad5de42ef6

transaction(
    proposalId: UInt64,
    name: String,
    description: String,
    amount: UFix64,
    deadline: UFix64
) {
    prepare(acct: auth(Storage) &Account) {
        let proposer = acct.address
        let proposalRef = GrantHub.getProposalRef(id: proposalId, acct: acct)
            ?? panic("Proposal not found")
        let milestoneId = proposalRef.createMilestone(
            name,
            description,
            amount,
            deadline
        )

        log("Created milestone with ID ".concat(milestoneId.toString()))
    }
}
