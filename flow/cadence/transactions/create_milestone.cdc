import GrantHub from 0x507dc1ab87c6636f

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
