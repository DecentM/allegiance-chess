import { NeoBoard } from './neo-board'

type Move = {
  fromIndex: number
  toIndex: number
}

export class MoveExecutor {
  constructor(private board: NeoBoard) {}

  public executeMove(move: Move) {
    const piece = this.board.getSquare(move.fromIndex)

    this.board.setSquare(move.fromIndex, null)
    this.board.setSquare(move.toIndex, piece)
  }
}
