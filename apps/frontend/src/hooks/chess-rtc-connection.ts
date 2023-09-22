import { ComputedRef, Ref, computed } from 'vue'
import { useRtcConnection } from './rtc-connection'

type ChessMessageBase = {
  value: unknown
  type: unknown
}

type AFENUpdateMessage = ChessMessageBase & {
  type: 'afen-update'
  value: string
}

type ChessMessage = AFENUpdateMessage

export type ChessRtcConnection = {
  connect: (connectId: string) => void
  mode: Ref<'initial' | 'client' | 'server'>
  peerId: Ref<string | null>
  boardAFEN: ComputedRef<string>
  sendMessage: (message: ChessMessage) => void
  open: ComputedRef<boolean>
  disconnect: () => void
}

export const useChessRtcConnection = (): ChessRtcConnection => {
  const { connect, lastData, mode, peerId, sendData, messages, disconnect } =
    useRtcConnection()

  const sendMessage = (message: ChessMessage) => {
    sendData(Buffer.from(JSON.stringify(message), 'utf8'))
  }

  const lastChessMessage: ComputedRef<ChessMessage | null> = computed(() => {
    if (!Buffer.isBuffer(lastData.value)) {
      return null
    }

    return JSON.parse(lastData.value.toString('utf8'))
  })

  const boardAFEN: ComputedRef<string> = computed(() => {
    if (lastChessMessage.value?.type !== 'afen-update') {
      return ''
    }

    return lastChessMessage.value.value || ''
  })

  const open = computed(() => {
    return messages.value.some((message) => message.type === 'open')
  })

  return {
    connect,
    mode,
    peerId,
    boardAFEN,
    sendMessage,
    open,
    disconnect,
  }
}
