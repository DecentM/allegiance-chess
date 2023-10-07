import { findBestMove, getBoardScore } from '@decentm/allegiance-chess-bot'
import { AfenPreset, Board, Notation } from '@decentm/allegiance-chess-core'

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

export type BotWorkerMessage =
  | ExecuteMoveIndexMessage
  | ResetMessage
  | BotMoveMessage

type BoardUpdateResponse = {
  type: 'board-update'
  afen: string
  moveHistory: string
  activeColour: 'white' | 'black'
  boardScore: number
}

type NodeExecutionResponse = {
  type: 'node-execution'
  node: Notation.Node
}

type ValidMovesResponse = {
  type: 'valid-moves'
  nodes: Notation.Node[]
}

export type BotWorkerResponse =
  | BoardUpdateResponse
  | NodeExecutionResponse
  | ValidMovesResponse

const board = new Board()

onmessage = (messageEvent: MessageEvent<BotWorkerMessage>) => {
  const message = messageEvent.data

  switch (message.type) {
    case 'reset':
      board.clear()
      board.importAFEN(AfenPreset.VanillaDefault)
      break

    case 'execute-move-index': {
      const move = board.executeMoveIndex(message.index)

      postMessage({
        type: 'node-execution',
        node: move,
      } as BotWorkerResponse)

      break
    }

    case 'bot-move': {
      const botResult = findBestMove(board, 15_000, 3)

      if (botResult) {
        const move = board.executeMoveIndex(botResult.index)

        postMessage({
          type: 'node-execution',
          node: move,
        } as BotWorkerResponse)
      }
      break
    }
  }

  const validMoves = board.getValidMoves()

  postMessage({
    type: 'board-update',
    afen: board.toAFEN(),
    moveHistory: board.getMoveHistory(),
    activeColour: board.activeColour,
    boardScore: getBoardScore(board),
  } as BotWorkerResponse)

  postMessage({
    type: 'valid-moves',
    nodes: validMoves,
  } as BotWorkerResponse)
}
