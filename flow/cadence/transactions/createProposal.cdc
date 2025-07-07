import GrantHub from 0x507dc1ab87c6636f

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
