import { Board } from './board'

type Move = {
  fromIndex: number
  toIndex: number
}

export class MoveExecutor {
  constructor(private board: Board) {}

  public executeMove(move: Move) {
    const piece = this.board.getSquare(move.fromIndex)

    this.board.setSquare(move.fromIndex, null)
    this.board.setSquare(move.toIndex, piece)
  }
}
