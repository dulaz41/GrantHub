import GrantHub from 0x4bccd1931d30027a

transaction(
    name: String,
    projectName: String,
    coverDescription: String,
    projectDescription: String,
    fundingGoal: UFix64
) {
    prepare(acct: auth(Storage, Capabilities) &Account) {
        let manager <- GrantHub.createProposalManager()
        let proposalId = manager.createProposal(
            acct: acct,
            name: name,
            projectName: projectName,
            coverDescription: coverDescription,
            projectDescription: projectDescription,
            fundingGoal: fundingGoal
        )

        destroy manager
        log("Created proposal with ID ".concat(proposalId.toString()))
    }
}
