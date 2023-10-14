import { Vector2 } from '../../lib/vector2'
import { PieceMoveGenerator } from '../move-generator'
import { Board, Square } from '../board'
import { Move, MoveGeneratorUtilities } from './utils'

export class KnightMoveGenerator implements PieceMoveGenerator {
  constructor(private utils: MoveGeneratorUtilities) {}

  public generateAttackedIndexes(fromIndex: number, square: Square): number[] {
    const colour = Board.getColour(Board.getAllegiance(square))
    const result: number[] = []

    const nnw = this.utils.generateIndexWithOffset(
      fromIndex,
      square,
      new Vector2(1, 2)
    )
    const nww = this.utils.generateIndexWithOffset(
      fromIndex,
      square,
      new Vector2(2, 1)
    )
    const sww = this.utils.generateIndexWithOffset(
      fromIndex,
      square,
      new Vector2(2, -1)
    )
    const ssw = this.utils.generateIndexWithOffset(
      fromIndex,
      square,
      new Vector2(1, -2)
    )
    const sse = this.utils.generateIndexWithOffset(
      fromIndex,
      square,
      new Vector2(-1, -2)
    )
    const see = this.utils.generateIndexWithOffset(
      fromIndex,
      square,
      new Vector2(-2, -1)
    )
    const nee = this.utils.generateIndexWithOffset(
      fromIndex,
      square,
      new Vector2(-2, 1)
    )
    const nne = this.utils.generateIndexWithOffset(
      fromIndex,
      square,
      new Vector2(-1, 2)
    )

    const nnws = this.utils.board.getSquare(nnw)
    const nwws = this.utils.board.getSquare(nww)
    const swws = this.utils.board.getSquare(sww)
    const ssws = this.utils.board.getSquare(ssw)
    const sses = this.utils.board.getSquare(sse)
    const sees = this.utils.board.getSquare(see)
    const nees = this.utils.board.getSquare(nee)
    const nnes = this.utils.board.getSquare(nne)

    if (
      nnw !== -1 &&
      (!nnws || Board.getColour(Board.getAllegiance(nnw))) !== colour
    )
      result.push(nnw)
    if (
      nww !== -1 &&
      (!nwws || Board.getColour(Board.getAllegiance(nww))) !== colour
    )
      result.push(nww)
    if (
      sww !== -1 &&
      (!swws || Board.getColour(Board.getAllegiance(sww))) !== colour
    )
      result.push(sww)
    if (
      ssw !== -1 &&
      (!ssws || Board.getColour(Board.getAllegiance(ssw))) !== colour
    )
      result.push(ssw)
    if (
      sse !== -1 &&
      (!sses || Board.getColour(Board.getAllegiance(sse))) !== colour
    )
      result.push(sse)
    if (
      see !== -1 &&
      (!sees || Board.getColour(Board.getAllegiance(see))) !== colour
    )
      result.push(see)
    if (
      nee !== -1 &&
      (!nees || Board.getColour(Board.getAllegiance(nee))) !== colour
    )
      result.push(nee)
    if (
      nne !== -1 &&
      (!nnes || Board.getColour(Board.getAllegiance(nne))) !== colour
    )
      result.push(nne)

    return result
  }

  public generateMoves(fromIndex: number, fromSquare: Square): Move[] {
    return this.generateAttackedIndexes(fromIndex, fromSquare).map(
      (toIndex) => {
        return this.utils.generateMove(
          fromIndex,
          toIndex,
          this.utils.board.getSquare(toIndex)
        )
      }
    )
  }
}
