# GrantHub 🌱

**GrantHub** is a decentralized grant funding smart contract system built on the Flow blockchain using Cadence. It enables a transparent, trustless, and milestone-based funding process for community projects, with both direct proposals and community pool support.

---

## 📄 Features

✅ Proposals with milestone-based funding<br>
✅ Pools for collective contributions<br>
✅ Community pool funding and withdrawals<br>
✅ Admin-controlled governance<br>
✅ Capability-based public access<br>
✅ Transparent events and on-chain tracking<br>

---

## 🏗️ Architecture

GrantHub is implemented in Cadence and includes:

* **Proposals**:

  * Resource-based with an internal vault for collected funds
  * Support for milestones with deadlines and amounts
  * Proposer or admin can withdraw
  * Public capabilities for safe read access

* **Pools**:

  * Resource-based
  * Allow collective funding for proposals
  * Funds tracked with FlowToken

* **Community Pool**:

  * Shared funding vault for future allocation
  * Admin- or proposer-authorized withdrawals

* **ProposalManager Resource**:

  * Factory to create proposals and pools
  * Publishes capabilities to proposals and pools
  * Keeps proposal and pool metadata up to date

* **Admin Role**:

  * Controls key operations
  * Configurable on deployment or via `setAdmin`

* **ProposalMeta**:

  * Lightweight metadata struct for easy indexing and scripts

---

## ⚙️ Contract Details

* **Contract name**: `GrantHub`
* **Proposals**:

  * Stored under dynamic paths: `/storage/GrantHubProposal_<id>`
  * Public capability published under `/public/GrantHubProposal_<id>`
* **Pools**:

  * Stored under `/storage/GrantHubPool_<id>`

---

## 🪙 Token Support

* Uses Flow Token (`FlowToken`) for vaults
* Compliant with FungibleToken interface

---

## 📦 Deployment

Make sure to:

✅ Deploy `FungibleToken` and `FlowToken` contracts on your Flow emulator/testnet
✅ Import their correct addresses into this contract
✅ Deploy GrantHub with an admin account

## 📚 Example Usage

### Create a proposal

* Call `createProposal` on a `ProposalManager` resource
* Provide name, project description, funding goal, etc.

### Fund a proposal

* Call `fund` on the `Proposal` resource with a FlowToken vault
* The vault is safely deposited into the proposal's internal vault

### Create a pool

* Call `createPool` on `ProposalManager`
* Provide the amount, which will be recorded in the Pool resource

### Use community pool

* Fund with `fundCommunityPool`
* Withdraw with `withdrawFromCommunityPool` (requires admin or proposer rights)

---

## 📜 Events

GrantHub emits the following events for tracking:

* `ProposalCreated`
* `ProposalFunded`
* `ProposalFundingCompleted`
* `MilestoneReleased`
* `PoolCreated`
* `PoolFundingCompleted`
* `CommunityPoolWithdrawal`
* `ProposalFundsWithdrawn`
* `ContractInitialized`

These help off-chain indexers or UIs track the contract’s lifecycle.

---

## 🔒 Security

✅ All critical withdraws are gated by `isAdmin` or proposer checks
✅ Proposals and Pools are resource-based to enforce ownership
✅ Capabilities are published in a secure way to allow read access
✅ Community pool is permission-gated

---

## 🚀 Future Improvements

[-] Add proposal voting features<br>
[-] Add non-fungible rewards for milestone completion<br>
[-] Add off-chain indexing API<br>
[-] Add front-end integration samples<br>

---

## 🧑‍💻 Contributing

Feel free to open issues, submit pull requests, or ask questions if you want to expand GrantHub for your community!

---
