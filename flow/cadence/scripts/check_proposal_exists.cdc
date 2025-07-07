import GrantHub from 0x507dc1ab87c6636f

access(all) fun main(id: UInt64): Bool {
    return GrantHub.proposalExists(id: id)
}
