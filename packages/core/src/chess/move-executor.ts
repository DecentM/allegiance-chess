import { Board } from './board'
import { Move } from './move-generators/utils'

export class MoveExecutor {
  constructor(private board: Board) {}

  public executeMove(move: Move) {
    const piece = this.board.getSquare(move.from)

    this.board.setSquare(move.from, null)
    this.board.setSquare(move.to, piece)
  }

  public undoMove(move: Move) {
    const piece = this.board.getSquare(move.to)

    this.board.setSquare(move.to, null)
    this.board.setSquare(move.from, piece)

    if (move.undo) {
      this.board.setSquare(move.undo.captures.index, move.undo.captures.square)
    }
  }
}
