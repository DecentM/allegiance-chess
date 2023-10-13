import { DataConnection, PeerError, Peer } from 'peerjs'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

import { Hex } from '../lib/hex'

type RtcMessageBase = {
  value: unknown
  type: unknown
}

export type DataRtcMessage = RtcMessageBase & {
  value: Buffer
  type: 'data'
}

export type ErrorRtcMessage = RtcMessageBase & {
  value: PeerError<
    | 'not-open-yet'
    | 'message-too-big'
    | 'negotiation-failed'
    | 'connection-closed'
  >
  type: 'error'
}

export type StateRtcMessage = RtcMessageBase & {
  value: RTCIceConnectionState
  type: 'state'
}

export type OpenRtcMessage = RtcMessageBase & {
  value: void
  type: 'open'
}

export type CloseRtcMessage = RtcMessageBase & {
  value: void
  type: 'close'
}

export type ConnectionRejectedRtcMessage = RtcMessageBase & {
  value: void
  type: 'connection-rejected'
}

export type ConnectionAcceptedRtcMessage = RtcMessageBase & {
  value: void
  type: 'connection-accepted'
}

export type ConnectionReadyRtcMessage = RtcMessageBase & {
  value: void
  type: 'connection-ready'
}

export type ConnectionClosedRtcMessage = RtcMessageBase & {
  value: void
  type: 'connection-closed'
}

export type RtcMessage =
  | DataRtcMessage
  | ErrorRtcMessage
  | StateRtcMessage
  | OpenRtcMessage
  | CloseRtcMessage
  | ConnectionAcceptedRtcMessage
  | ConnectionReadyRtcMessage
  | ConnectionRejectedRtcMessage
  | ConnectionClosedRtcMessage

export const useRtcConnection = (onMessage: (message: RtcMessage) => void) => {
  const peer = ref<Peer | null>(null)

  const peerId = ref<string | null>(null)
  const connection = ref<DataConnection | null>()

  const attachEventListeners = (newConnection: DataConnection) => {
    const handleData = (data: unknown) => {
      if (data instanceof ArrayBuffer) {
        onMessage({
          type: 'data',
          value: Buffer.from(data),
        })
        return
      }

      if (!Buffer.isBuffer(data)) {
        console.warn('Non-buffer data received through WebRTC!', data)
        return
      }

      onMessage({
        type: 'data',
        value: data,
      })
    }

    const handleStateChange = (state: RTCIceConnectionState) => {
      onMessage({ type: 'state', value: state })
    }

    const handleOpen = () => {
      onMessage({ type: 'open', value: undefined })
    }

    const handleError = (
      error: PeerError<
        | 'not-open-yet'
        | 'message-too-big'
        | 'negotiation-failed'
        | 'connection-closed'
      >
    ) => {
      onMessage({ type: 'error', value: error })
    }

    const handleClose = () => {
      connection.value?.off('data', handleData)
      connection.value?.off('error', handleError)
      connection.value?.off('close', handleClose)
      connection.value?.off('iceStateChanged', handleStateChange)
      connection.value?.off('open', handleOpen)

      onMessage({ type: 'close', value: undefined })

      connection.value = null
    }

    newConnection.on('data', handleData)
    newConnection.on('error', handleError)
    newConnection.on('close', handleClose)
    newConnection.on('iceStateChanged', handleStateChange)
    newConnection.on('open', handleOpen)
  }

  const connect = (connectId: string) => {
    // Refuse to connect to a server if we're already connected
    if (connection.value) {
      return
    }

    if (!peer.value || !connectId) {
      return
    }

    const serverId = Hex.hexToUtf8(connectId)
    const newConnection = peer.value.connect(serverId, {
      metadata: {
        guestId: peerId.value,
      },
    })

    attachEventListeners(newConnection)

    connection.value = newConnection
  }

  const sendData = (data: Buffer): boolean => {
    if (!connection.value) {
      return false
    }

    connection.value.send(data)
    onMessage({
      type: 'data',
      value: data,
    })
    return true
  }

  const disconnect = () => {
    if (!connection.value) {
      return false
    }

    connection.value.close()
    connection.value = null
    return true
  }

  onMounted(() => {
    peer.value = new Peer()

    peer.value.on('open', (id) => {
      peerId.value = Hex.utf8ToHex(id)

      onMessage({ type: 'connection-ready', value: undefined })
    })

    peer.value.on('disconnected', () => {
      peerId.value = null
      connection.value = null

      onMessage({ type: 'connection-closed', value: undefined })
    })

    peer.value.on('connection', (newConnection) => {
      // Someone might connect after we're already connected
      if (connection.value) {
        onMessage({ type: 'connection-rejected', value: undefined })
        newConnection.close()
        return
      }

      attachEventListeners(newConnection)

      connection.value = newConnection

      onMessage({ type: 'connection-accepted', value: undefined })
    })
  })

  onBeforeUnmount(() => {
    connection.value?.close()
    peer.value?.disconnect()

    connection.value = null
    peer.value = null
  })

  const isHost = computed(() => {
    return connection.value?.metadata?.guestId !== peerId.value
  })

  return {
    connect,
    peerId,
    sendData,
    disconnect,
    isHost,
  }
}
