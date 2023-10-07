import { findBestMove, getBoardScore } from '@decentm/allegiance-chess-bot'
import {
  AfenPreset,
  Board,
  BoardSquare,
  Notation,
} from '@decentm/allegiance-chess-core'

type BotMoveMessage = {
  type: 'bot-move'
}

type ExecuteMoveIndexMessage = {
  type: 'execute-move-index'
  index: number
}

type ResetMessage = {
  type: 'reset'
}

type ImportAfenMessage = {
  type: 'import-afen'
  afen: string
}

type ImportMoveHistoryMessage = {
  type: 'import-move-history'
  history: string
}

export type BotWorkerMessage =
  | ExecuteMoveIndexMessage
  | ResetMessage
  | BotMoveMessage
  | ImportAfenMessage
  | ImportMoveHistoryMessage

type BoardUpdateResponse = {
  type: 'board-update'
  afen: string
  moveHistory: string
  activeColour: 'white' | 'black'
  boardScore: number
  checkMoves: Notation.MoveNode[]
  enPassantTarget: Notation.Coordinates | null
  moveHistoryAst: Notation.RootNode
  squares: Array<Notation.Coordinates & BoardSquare>
  validMoves: Notation.Node[]
  gameOver: Notation.GameOverNode | null
}

type NodeExecutionResponse = {
  type: 'node-execution'
  node: Notation.Node
}

type ReadyResponse = {
  type: 'ready'
}

export type BotWorkerResponse =
  | BoardUpdateResponse
  | NodeExecutionResponse
  | ReadyResponse

const board = new Board()
board.importAFEN(AfenPreset.VanillaDefault)

const getGameover = (validMoves: Notation.Node[]) => {
  if (validMoves.length !== 1) {
    return null
  }

  const move = validMoves.at(0)

  if (!move || move.kind !== 'game-over') {
    return null
  }

  return move
}

onmessage = (messageEvent: MessageEvent<BotWorkerMessage>) => {
  const message = messageEvent.data

  switch (message.type) {
    case 'import-afen': {
      board.importAFEN(message.afen)
      break
    }

    case 'import-move-history': {
      board.importMoveHistory(message.history)
      break
    }

    case 'reset': {
      board.clear()
      board.importAFEN(AfenPreset.VanillaDefault)

      const response: BotWorkerResponse = {
        type: 'ready',
      }

      postMessage(response)
      break
    }

    case 'execute-move-index': {
      const move = board.executeMoveIndex(message.index)
      const response: BotWorkerResponse = {
        type: 'node-execution',
        node: move,
      }

      postMessage(response)

      break
    }

    case 'bot-move': {
      const botResult = findBestMove(board, 15_000, 3)
      const move = board.executeMoveIndex(botResult.index)

      const response: BotWorkerResponse = {
        type: 'node-execution',
        node: move,
      }

      postMessage(response)
      break
    }
  }

  const validMoves = board.getValidMoves()
  const gameOver = getGameover(validMoves)

  const updateResponse: BotWorkerResponse = {
    type: 'board-update',
    afen: board.toAFEN(),
    moveHistory: board.getMoveHistory(),
    activeColour: board.activeColour,
    boardScore: getBoardScore(board),
    validMoves,
    checkMoves: board.getCheckMoves(),
    enPassantTarget: board.enPassantTarget,
    moveHistoryAst: board.getMoveHistoryAst(),
    squares: board.getSquares(),
    gameOver,
  }

  postMessage(updateResponse)
}
