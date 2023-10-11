import { Board } from './board'
import { Move } from './move-generators/utils'

export class MoveExecutor {
  constructor(private board: Board) {}

  public executeMove(move: Move) {
    const piece = this.board.getSquare(move.from)

    this.board.setSquare(move.from, null)
    this.board.setSquare(move.to, piece)
  }
}
