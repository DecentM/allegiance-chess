import Peer, { DataConnection, PeerError } from 'peerjs'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

export class Hex {
  static utf8ToHex(id: string) {
    return Buffer.from(id, 'utf8').toString('hex')
  }

  static hexToUtf8(hex: string) {
    return Buffer.from(hex, 'hex').toString('utf8')
  }
}

type RtcMessageBase = {
  value: unknown
  type: unknown
}

export type DataRtcMessage = RtcMessageBase & {
  value: Buffer
  type: 'data'
}

type ErrorRtcMessage = RtcMessageBase & {
  value: PeerError<
    | 'not-open-yet'
    | 'message-too-big'
    | 'negotiation-failed'
    | 'connection-closed'
  >
  type: 'error'
}

type CloseRtcMessage = RtcMessageBase & {
  value: void
  type: 'close'
}

type StateRtcMessage = RtcMessageBase & {
  value: RTCIceConnectionState
  type: 'state'
}

type OpenRtcMessage = RtcMessageBase & {
  value: void
  type: 'open'
}

type RtcMessage =
  | DataRtcMessage
  | ErrorRtcMessage
  | CloseRtcMessage
  | StateRtcMessage
  | OpenRtcMessage

export const useRtcConnection = () => {
  const peer = ref<Peer | null>()

  const peerId = ref<string | null>(null)
  const messages = ref<RtcMessage[]>([])
  const connection = ref<DataConnection | null>()
  const mode = ref<'initial' | 'client' | 'server'>('initial')

  const addMessage = (message: RtcMessage) => {
    messages.value = [...messages.value, message]
  }

  const attachEventListeners = (newConnection: DataConnection) => {
    const handleData = (data: unknown) => {
      if (data instanceof ArrayBuffer) {
        addMessage({
          type: 'data',
          value: Buffer.from(data),
        })
        return
      }

      if (!Buffer.isBuffer(data)) {
        console.warn('Non-buffer data received through WebRTC!', data)
        return
      }

      addMessage({
        type: 'data',
        value: data,
      })
    }

    const handleStateChange = (state: RTCIceConnectionState) => {
      addMessage({ type: 'state', value: state })
    }

    const handleOpen = () => {
      addMessage({ type: 'open', value: undefined })
    }

    const handleError = (
      error: PeerError<
        | 'not-open-yet'
        | 'message-too-big'
        | 'negotiation-failed'
        | 'connection-closed'
      >
    ) => {
      addMessage({ type: 'error', value: error })

      connection.value?.close()
    }

    const handleClose = () => {
      addMessage({ type: 'close', value: undefined })

      connection.value?.on('data', handleData)
      connection.value?.on('error', handleError)
      connection.value?.on('close', handleClose)
      connection.value?.on('iceStateChanged', handleStateChange)
      connection.value?.on('open', handleOpen)

      mode.value = 'initial'
      connection.value = null
    }

    newConnection.on('data', handleData)
    newConnection.on('error', handleError)
    newConnection.on('close', handleClose)
    newConnection.on('iceStateChanged', handleStateChange)
    newConnection.on('open', handleOpen)
  }

  onMounted(() => {
    peer.value = new Peer()

    peer.value.on('open', (id) => {
      peerId.value = Hex.utf8ToHex(id)
    })

    peer.value.on('connection', (newConnection) => {
      // Someone might connect after we're already connected
      if (connection.value) {
        newConnection.close()
        return
      }

      mode.value = 'server'
      attachEventListeners(newConnection)

      connection.value = newConnection
    })
  })

  onBeforeUnmount(() => {
    peer.value?.destroy()
    connection.value?.close()
  })

  const connect = (connectId: string) => {
    // Refuse to connect to a server if we're already connected
    if (connection.value) {
      return
    }

    if (!peer.value || !connectId) {
      return
    }

    const serverId = Hex.hexToUtf8(connectId)
    const newConnection = peer.value.connect(serverId)

    mode.value = 'client'

    attachEventListeners(newConnection)

    connection.value = newConnection
  }

  const lastData = computed(() => {
    return messages.value.filter((message) => message.type === 'data').at(-1)
      ?.value
  })

  const sendData = (data: Buffer): boolean => {
    if (!connection.value) {
      return false
    }

    connection.value.send(data)
    addMessage({
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

  return {
    connect,
    mode,
    peerId,
    messages,
    lastData,
    sendData,
    disconnect,
  }
}
