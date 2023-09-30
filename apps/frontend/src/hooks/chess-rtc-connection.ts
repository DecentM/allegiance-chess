import { ComputedRef, Ref, computed } from 'vue'
import { useRtcConnection } from './rtc-connection'

type AFENUpdateMessage = {
  type: 'afen-update'
  value: string
}

type BeginGameMessage = {
  type: 'side-assignment'
  value: 'white' | 'black'
}

type ChessMessage = AFENUpdateMessage | BeginGameMessage

export type ChessRtcConnection = {
  connect: (connectId: string) => void
  mode: Ref<'initial' | 'client' | 'server'>
  peerId: Ref<string | null>
  boardAFEN: ComputedRef<string>
  sendMessage: (message: ChessMessage) => void
  open: ComputedRef<boolean>
  disconnect: () => void
  serverSide: ComputedRef<'white' | 'black' | null>
}

export const useChessRtcConnection = (): ChessRtcConnection => {
  const { connect, mode, peerId, sendData, messages, disconnect } =
    useRtcConnection()

  const sendMessage = (message: ChessMessage) => {
    sendData(Buffer.from(JSON.stringify(message), 'utf8'))
  }

  const chessMessages: ComputedRef<ChessMessage[]> = computed(() => {
    return messages.value
      .filter((message) => message.type === 'data')
      .map((message) => {
        if (!Buffer.isBuffer(message.value)) {
          return null
        }

        return JSON.parse(message.value.toString('utf8'))
      })
  })

  const boardAFEN: ComputedRef<string> = computed(() => {
    const lastAFENMessage = chessMessages.value.findLast(
      (message) => message.type === 'afen-update'
    )

    if (!lastAFENMessage) {
      return ''
    }

    return lastAFENMessage.value || ''
  })

  const open = computed(() => {
    return messages.value.some((message) => message.type === 'open')
  })

  const serverSide: ComputedRef<'white' | 'black' | null> = computed(() => {
    const sideAssignmentMessage = chessMessages.value.find(
      (message) => message.type === 'side-assignment'
    )

    if (!sideAssignmentMessage) {
      return null
    }

    return sideAssignmentMessage.value as 'white' | 'black'
  })

  return {
    connect,
    mode,
    peerId,
    boardAFEN,
    sendMessage,
    open,
    disconnect,
    serverSide,
  }
}
