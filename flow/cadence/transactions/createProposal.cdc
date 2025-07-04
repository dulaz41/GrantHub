import GrantHub from 0xb9b9e5ad5de42ef6

transaction(
    name: String,
    projectName: String,
    coverDescription: String,
    projectDescription: String,
    fundingGoal: UFix64
) {
    prepare(acct: auth(Storage, Capabilities) &Account) {
        let proposer = acct.address
        let proposalId = GrantHub.createProposal(
            proposer: proposer,
            name: name,
            projectName: projectName,
            coverDescription: coverDescription,
            projectDescription: projectDescription,
            fundingGoal: fundingGoal
        )
        log("Created proposal with ID: ".concat(proposalId.toString()))
    }
}
