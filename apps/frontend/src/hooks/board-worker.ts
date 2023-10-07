import { BoardSquare, Notation } from '@decentm/allegiance-chess-core'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

import { BotWorkerMessage, BotWorkerResponse } from '../lib/bot-worker'
import BotWorker from '../lib/bot-worker?worker'
import { useBoardAudio } from './board-audio'

export type UseBoardWorkerInput = {
  autoplayFor: Array<'white' | 'black'>
}

export const useBoardWorker = (input: UseBoardWorkerInput) => {
  const worker = ref<Worker | null>()
  const ready = ref(false)
  const loading = ref(true)

  const afen = ref<string>('')
  const moveHistory = ref<string>('')
  const activeColour = ref<'white' | 'black'>('white')
  const boardScore = ref(0)
  const validMoves = ref<Notation.Node[]>([])

  const checkMoves = ref<Notation.MoveNode[]>([])
  const enPassantTarget = ref<Notation.Coordinates | null>(null)
  const moveHistoryAst = ref<Notation.RootNode>({ kind: 'root', children: [] })
  const squares = ref<Array<Notation.Coordinates & BoardSquare>>([])

  const audio = useBoardAudio()

  const gameOver = computed(() => {
    if (validMoves.value.length !== 1) {
      return null
    }

    const move = validMoves.value.at(0)

    if (!move || move.kind !== 'game-over') {
      return null
    }

    return move
  })

  const handleWorkerMessage = (
    messageEvent: MessageEvent<BotWorkerResponse>
  ) => {
    const message = messageEvent.data

    switch (message.type) {
      case 'board-update':
        moveHistory.value = message.moveHistory
        afen.value = message.afen
        activeColour.value = message.activeColour
        boardScore.value = message.boardScore
        validMoves.value = message.validMoves
        checkMoves.value = message.checkMoves
        enPassantTarget.value = message.enPassantTarget
        moveHistoryAst.value = message.moveHistoryAst
        squares.value = message.squares

        loading.value = false
        break

      case 'node-execution':
        audio?.playNode(message.node)
        break

      case 'ready':
        ready.value = true
        break
    }

    if (
      message.type === 'board-update' &&
      input.autoplayFor.includes(message.activeColour) &&
      !gameOver.value
    ) {
      loading.value = true
      worker.value?.postMessage({ type: 'bot-move' } as BotWorkerMessage)
    }
  }

  onMounted(() => {
    worker.value = new BotWorker()
    worker.value.addEventListener('message', handleWorkerMessage)
  })

  onBeforeUnmount(() => {
    worker.value?.removeEventListener('message', handleWorkerMessage)

    const message: BotWorkerMessage = { type: 'reset' }
    worker.value?.postMessage(message)
  })

  const executeMoveIndex = (index: number) => {
    loading.value = true

    const message: BotWorkerMessage = {
      type: 'execute-move-index',
      index,
    }

    worker.value?.postMessage(message)
  }

  const importAfen = (afen: string) => {
    loading.value = true

    const message: BotWorkerMessage = {
      type: 'import-afen',
      afen,
    }

    worker.value?.postMessage(message)
  }

  const importMoveHistory = (history: string) => {
    loading.value = true

    const message: BotWorkerMessage = {
      type: 'import-move-history',
      history,
    }

    worker.value?.postMessage(message)
  }

  const reset = () => {
    loading.value = true

    const message: BotWorkerMessage = {
      type: 'reset',
    }

    worker.value?.postMessage(message)
  }

  return {
    ready,
    loading,

    afen,
    moveHistory,
    moveHistoryAst,
    activeColour,
    boardScore,
    validMoves,
    checkMoves,
    enPassantTarget,
    squares,
    gameOver,

    executeMoveIndex,
    importAfen,
    importMoveHistory,
    reset,
  }
}
