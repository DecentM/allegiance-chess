import { Ref, ref } from 'vue'
import * as Sentry from '@sentry/vue'

import {
  DataRtcMessage,
  ErrorRtcMessage,
  RtcMessage,
  useRtcConnection,
} from './rtc-connection'
import { useNotify } from './notify'
import { useRouter } from 'vue-router'

type ExecuteNodeIndexMessage = {
  type: 'execute-node-index'
  value: number
}

type SideAssignmentMessage = {
  type: 'side-assignment'
  value: 'white' | 'black'
}

type ChessMessage = ExecuteNodeIndexMessage | SideAssignmentMessage

export type ChessRtcConnection = {
  connect: (connectId: string) => void
  peerId: Ref<string | null>
  sendMessage: (message: ChessMessage) => void
  open: Ref<boolean>
  disconnect: () => void

  serverSide: Ref<'white' | 'black' | null>
  moveHistory: Ref<number[]>
  isHost: Ref<boolean>
}

export const useChessRtcConnection = (): ChessRtcConnection => {
  const { notify } = useNotify()
  const router = useRouter()

  const sendMessage = (message: ChessMessage) => {
    sendData(Buffer.from(JSON.stringify(message), 'utf8'))
  }

  const serverSide: Ref<'white' | 'black'> = ref('white')
  const open = ref(false)
  const moveHistory = ref<number[]>([])

  const receiveOpenMessage = () => {
    open.value = true
    router.push(`/play/online/${peerId.value}`)
  }

  const receiveDataMessage = (rtcMessage: DataRtcMessage) => {
    let message: ChessMessage | null = null

    try {
      message = JSON.parse(rtcMessage.value.toString('utf8')) as ChessMessage
    } catch (error) {
      if (error instanceof Error) {
        Sentry.captureException(error, {
          extra: {
            message: rtcMessage.value?.toString('utf8'),
          },
        })
      } else {
        console.error(error)
      }
    }

    if (!message) {
      return
    }

    switch (message.type) {
      case 'side-assignment':
        serverSide.value = message.value
        break

      case 'execute-node-index': {
        moveHistory.value = [...moveHistory.value, message.value]

        break
      }
    }
  }

  const receiveCloseMessage = () => {
    notify({ message: 'Connection closed', icon: 'link_off' })
    router.push('/play')
  }

  const receiveErrorMessage = (message: ErrorRtcMessage) => {
    notify({
      message: 'Connection error',
      caption: message.value.message,
      icon: 'link_off',
      iconColor: 'red',
    })
  }

  const receiveReadyMessage = () => {
    notify({
      message: 'WebRTC connection ready',
      icon: 'check',
      iconColor: 'green',
    })
  }

  const receiveRejectedMessage = () => {
    notify({
      message: 'Refused secondary connection',
      icon: 'link_off',
      iconColor: 'red',
    })
  }

  const receiveAcceptedMessage = () => {
    notify({ message: 'Connected to peer', icon: 'link' })
    router.push(`/play/online/${peerId.value}`)
  }

  const receiveClosedMessage = () => {
    notify({ message: 'WebRTC connection closed', icon: 'link_off' })
  }

  const receiveMessage = (rtcMessage: RtcMessage) => {
    switch (rtcMessage.type) {
      case 'data':
        return receiveDataMessage(rtcMessage)

      case 'open':
        return receiveOpenMessage()

      case 'close':
        return receiveCloseMessage()

      case 'error':
        return receiveErrorMessage(rtcMessage)

      case 'connection-ready':
        return receiveReadyMessage()

      case 'connection-rejected':
        return receiveRejectedMessage()

      case 'connection-accepted':
        return receiveAcceptedMessage()

      case 'connection-closed':
        return receiveClosedMessage()
    }
  }

  const { connect, peerId, sendData, disconnect, isHost } =
    useRtcConnection(receiveMessage)

  return {
    connect,
    peerId,
    sendMessage,
    open,
    disconnect,
    serverSide,
    moveHistory,
    isHost,
  }
}
