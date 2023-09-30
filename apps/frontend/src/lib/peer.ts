import { EventEmitter } from 'eventemitter3'
import type { Peer } from 'peerjs'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
class MockPeer extends EventEmitter<string, unknown> implements Peer {
  readonly id = 'mock-peer'

  readonly options = {}
  readonly open = false
  readonly socket = null as never
  readonly connections = {}
  readonly destroyed = false
  readonly disconnected = false

  readonly _getMessages = () => []
  readonly connect = () => null as never
  readonly call = () => null as never
  readonly _removeConnection = () => null
  readonly getConnection = () => null
  readonly destroy = () => null
  readonly disconnect = () => null
  readonly reconnect = () => null
  readonly listAllPeers = () => null

  readonly emitError = () => null

  readonly _serializers = {}
}

export const getPeerjs = async (): Promise<typeof Peer> => {
  if (typeof window === 'undefined') {
    return MockPeer as unknown as typeof Peer
  }

  const { Peer } = await import('peerjs')

  return Peer
}
