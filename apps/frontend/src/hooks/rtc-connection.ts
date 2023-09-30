import type { DataConnection, PeerError, Peer } from 'peerjs'
import { onBeforeUnmount, onMounted, ref } from 'vue'

import { Hex } from '../lib/hex'
import { useNotify } from './notify'
import { getPeerjs } from '../lib/peer'

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
  | StateRtcMessage
  | OpenRtcMessage

export const useRtcConnection = async () => {
  const Peer = await getPeerjs()

  const peer = ref<Peer | null>(null)
  const { notify } = useNotify()

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

      notify({
        message: 'Connection error',
        caption: error.message,
        icon: 'link_off',
        iconColor: 'red',
      })
    }

    const handleClose = () => {
      connection.value?.on('data', handleData)
      connection.value?.on('error', handleError)
      connection.value?.on('close', handleClose)
      connection.value?.on('iceStateChanged', handleStateChange)
      connection.value?.on('open', handleOpen)

      mode.value = 'initial'
      connection.value = null

      messages.value = []

      notify({ message: 'Connection closed', icon: 'link_off' })
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

      notify({ message: 'Connection ready', icon: 'check', iconColor: 'green' })
    })

    peer.value.on('connection', (newConnection) => {
      // Someone might connect after we're already connected
      if (connection.value) {
        notify({
          message: 'Refused secondary connection',
          icon: 'link_off',
          iconColor: 'red',
        })
        newConnection.close()
        return
      }

      mode.value = 'server'
      attachEventListeners(newConnection)

      connection.value = newConnection

      notify({ message: 'Connected to guest', icon: 'link' })
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

    notify({ message: 'Connected to host', icon: 'link' })
  }

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
    sendData,
    disconnect,
  }
}
