import { Ref, ref } from 'vue'
import * as Sentry from '@sentry/vue'

import { DataRtcMessage, RtcMessage, useRtcConnection } from './rtc-connection'

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
  mode: Ref<'initial' | 'client' | 'server'>
  peerId: Ref<string | null>
  sendMessage: (message: ChessMessage) => void
  open: Ref<boolean>
  disconnect: () => void

  serverSide: Ref<'white' | 'black' | null>
  moveHistory: Ref<number[]>
}

export const useChessRtcConnection = (): ChessRtcConnection => {
  const sendMessage = (message: ChessMessage) => {
    sendData(Buffer.from(JSON.stringify(message), 'utf8'))
  }

  const serverSide: Ref<'white' | 'black'> = ref('white')
  const open = ref(false)
  const moveHistory = ref<number[]>([])

  const receiveOpenMessage = () => {
    open.value = true
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

  const receiveMessage = (rtcMessage: RtcMessage) => {
    switch (rtcMessage.type) {
      case 'data':
        return receiveDataMessage(rtcMessage)

      case 'open':
        return receiveOpenMessage()
    }
  }

  const { connect, mode, peerId, sendData, disconnect } =
    useRtcConnection(receiveMessage)

  return {
    connect,
    mode,
    peerId,
    sendMessage,
    open,
    disconnect,
    serverSide,
    moveHistory,
  }
}
