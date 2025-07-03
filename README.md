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

✅ Deploy `FungibleToken` and `FlowToken` contracts on your Flow emulator/testnet<br>
✅ Import their correct addresses into this contract<br>
✅ Deploy GrantHub with an admin account<br>

---

## 🚀 Usage & Commands

Below are **Flow CLI** commands to interact with the GrantHub contract after deployment:

### 📌 Checking user vault

```bash
flow scripts execute cadence/scripts/check_vault_exists.cdc \
  --network testnet \
  --args-json '[{"type":"Address","value":"0x4bccd1931d30027a"}]'
```

### 📌 Get all proposals metadata

```bash
flow scripts execute cadence/scripts/getAllProposals.cdc --network testnet
```

### 📌 Get a single proposal

```bash
flow scripts execute cadence/scripts/getProposals.cdc \
  --network testnet \
  --args-json '[{"type":"UInt64","value":"1"}, {"type":"Address","value":"0x4bccd1931d30027a"}]' \
  --signer grant
```

### 📌 Fund a proposal

```bash
flow transactions send cadence/transactions/fundProposal.cdc \
  --network testnet \
  --args-json '[{"type":"Address","value":"0x4bccd1931d30027a"}, {"type":"UInt64","value":"3"}, {"type":"UFix64","value":"10.0"}]' \
  --signer grant
```

### 📌 Create a milestone for a proposal

```bash
flow transactions send cadence/transactions/create_milestone.cdc \
  --signer grant \
  --args-json '[{"type":"UInt64","value":"1"}, {"type":"String","value":"Milestone 1"}, {"type":"String","value":"Description"}, {"type":"UFix64","value":"10.0"}, {"type":"UFix64","value":"1234567890.0"}]' \
  --network testnet
```

### 📌 Fund the community pool

```bash
flow transactions send cadence/transactions/fundCommunityPool.cdc \
  --signer grant \
  --args-json '[{"type":"UFix64","value":"10.0"}]' \
  --network testnet
```

### 📌 Release a milestone payment

```bash
flow transactions send cadence/transactions/release_milestone.cdc \
  --signer grant \
  --args-json '[{"type":"UInt64","value":"1"}, {"type":"UInt64","value":"1"}, {"type":"Address","value":"0x..."}]' \
  --network testnet
```

### 📌 Withdraw from the community pool

```bash
flow transactions send cadence/transactions/withdrawCommunityFunds.cdc \
  --signer grant \
  --args-json '[{"type":"UInt64","value":"1"}, {"type":"UFix64","value":"5.0"}]' \
  --network testnet
```

### 📌 Withdraw proposal funds

```bash
flow transactions send cadence/transactions/withdrawFunds.cdc \
  --signer grant \
  --args-json '[{"type":"UInt64","value":"1"}, {"type":"UFix64","value":"5.0"}]' \
  --network testnet
```

### 📌 Get milestone data

```bash
flow scripts execute cadence/scripts/getMilestone.cdc \
  --args-json '[{"type":"UInt64","value":"1"}, {"type":"UInt64","value":"1"}, {"type":"Address","value":"0x..."}]' \
  --network testnet
```

### 📌 Get community pool balance

```bash
flow scripts execute cadence/scripts/getCommunityPoolBalance.cdc --network testnet
```

### 📌 Get proposal balance

```bash
flow scripts execute cadence/scripts/getProposalBalance.cdc \
  --args-json '[{"type":"UInt64","value":"1"}]' \
  --network testnet
```

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

✅ All critical withdraws are gated by `isAdmin` or proposer checks<br>
✅ Proposals and Pools are resource-based to enforce ownership<br>
✅ Capabilities are published in a secure way to allow read access<br>
✅ Community pool is permission-gated<br>

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
