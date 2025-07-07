Absolutely — here is a **professional and in-depth README** for the entire GrantHub **project** (not just the smart contract), covering the full end-to-end architecture, its frontend, CLI, testing, and developer guidelines:

---

# GrantHub 🌱

GrantHub is a **full-stack decentralized grant funding platform** built on the Flow blockchain. It empowers communities to fund projects transparently and trustlessly through milestone-based proposals, pooled resources, and community-driven governance.

---

## 🚀 Overview

GrantHub allows project owners to submit proposals for funding, break them into milestones, and receive funding progressively as milestones are completed. Funders can contribute to individual proposals or to a shared community pool managed by an administrator or the community itself.

The platform leverages:

✅ Cadence smart contracts (Flow blockchain)
✅ A Flow CLI-driven developer workflow
✅ React-based front-end (optional)
✅ Robust capability-based permission models
✅ Events for easy off-chain indexing

---

## 🏗️ Project Architecture

The GrantHub project is made of **three main layers**:

### 1️⃣ Smart Contracts (Cadence)

- **Proposal**
  Stores project funding details, milestones, funder tracking, and payout logic.

- **Pool**
  A shared contribution resource to collectively fund proposals.

- **Community Pool**
  A contract-level FlowToken vault allowing community-managed allocations.

- **ProposalManager**
  A factory to create, manage, and expose capabilities for proposals and pools.

All written in **Cadence**, the secure resource-oriented smart contract language of Flow.

---

### 2️⃣ Frontend (React + FCL)

- React-based user interface (optional, but recommended)
- Uses **Flow Client Library (FCL)** to interact with contracts
- Allows users to:

  - View proposals and milestones
  - Fund proposals
  - Create new proposals
  - Manage milestone releases
  - Withdraw funds

You can scaffold the frontend with any framework, but React + TailwindCSS is highly recommended for the best developer experience.

---

### 3️⃣ Developer CLI

A **developer CLI** built around the Flow CLI to test, deploy, and script interactions:

✅ Deploy contracts
✅ Run transactions
✅ Run scripts
✅ View events and logs

We provide starter scripts for:

- creating proposals
- funding proposals
- creating milestones
- funding and withdrawing from the community pool
- checking balances and metadata

(See `scripts/` and `transactions/` folders in the project tree.)

---

## 📦 Installation

Clone this repository:

```bash
git clone https://github.com/yourusername/GrantHub.git
cd GrantHub
```

Set up your Flow project:

```bash
flow setup
```

Configure your `.env` to include your Flow emulator, testnet, or mainnet addresses.

---

## ⚙️ Contract Deployment

1. Deploy the **FungibleToken** and **FlowToken** contracts (if not already deployed).
2. Deploy `GrantHub.cdc` with your admin account.

```bash
flow deploy
```

Update contract addresses in your front-end and scripts accordingly.

---

## 🪙 Token Support

- **FlowToken** is used for funding
- Fully conforms to the **FungibleToken** interface

---

## 🔗 Usage

Once deployed, use the Flow CLI or your React frontend to:

- Create proposals (`createProposal`)
- Fund proposals (`fundProposal`)
- Create milestones (`createMilestone`)
- Fund the community pool (`fundCommunityPool`)
- Release milestone payments (`releaseMilestone`)
- Withdraw from the community pool (`withdrawCommunityFunds`)
- Withdraw funds from proposals (`withdrawFunds`)

See the **Commands** section below for concrete CLI usage examples.

---

## 🖥️ Frontend

The recommended front-end is built with **React + Flow Client Library (FCL)**.

Example features you can implement:

- Proposal listing with milestones and status
- Proposal funding form
- Community pool dashboard
- Admin milestone releases
- Transaction confirmations and event logs

All of these hook directly into the Cadence events for real-time updates.

---

## 📜 Flow CLI Commands

Here are some practical commands to interact with GrantHub:

```bash
# check user vault
flow scripts execute cadence/scripts/check_vault_exists.cdc \
  --network testnet \
  --args-json '[{"type":"Address","value":"0x123"}]'

# get all proposals
flow scripts execute cadence/scripts/getAllProposals.cdc --network testnet

# create a proposal
flow transactions send cadence/transactions/createProposal.cdc \
  --args-json '[{"type":"String","value":"New Proposal"}, {"type":"String","value":"My Project"}, {"type":"String","value":"Description"}, {"type":"String","value":"Details"}, {"type":"UFix64","value":"10.0"}]' \
  --signer grantadmin \
  --network testnet

# fund proposal
flow transactions send cadence/transactions/fundProposal.cdc \
  --args-json '[{"type":"UInt64","value":"1"}, {"type":"UFix64","value":"5.0"}]' \
  --signer user1 \
  --network testnet

# release milestone
flow transactions send cadence/transactions/release_milestone.cdc \
  --args-json '[{"type":"UInt64","value":"1"}, {"type":"UInt64","value":"1"}, {"type":"Address","value":"0x..."}]' \
  --signer grantadmin \
  --network testnet

# get proposal balance
flow scripts execute cadence/scripts/getProposalBalance.cdc \
  --args-json '[{"type":"UInt64","value":"1"}]' \
  --network testnet
```

For all available commands, see `scripts/` and `transactions/`.

---

## 🔒 Security Considerations

✅ Withdrawals only by proposer or admin
✅ Resources used to enforce unique ownership
✅ Vaults protect against double spends
✅ Capability-based publishing prevents unauthorized access
✅ Audit-friendly event emission

---

## 📝 Testing

We recommend writing unit tests for the contracts using the Flow emulator:

```bash
flow emulator start
```

Then run:

```bash
flow test
```

You can also run your React app against the emulator for a full local development loop.

---

## 🎯 Roadmap

- Add proposal voting on milestones
- Add NFT rewards for milestone completion
- Add off-chain indexing service
- Build a reference front-end for contributors

---

## 🧑‍💻 Contributing

We welcome contributions! Please:

- Open an issue to discuss features
- Fork the repo
- Submit a PR
- Follow semantic commit messages (`feat:`, `fix:`, `docs:` etc.)

---

## 🤝 License

MIT — please see the `LICENSE` file.

---

## 🙏 Acknowledgements

Built on Flow blockchain using Cadence.
Thanks to the Flow community for resources and open discussions.

---

If you want, I can **also scaffold your React front-end structure** with all folders and starter files — just let me know! 🚀
