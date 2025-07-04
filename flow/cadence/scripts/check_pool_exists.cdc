import GrantHub from 0xb9b9e5ad5de42ef6

access(all) fun main(id: UInt64): Bool {
    return GrantHub.poolExists(id: id)
}
