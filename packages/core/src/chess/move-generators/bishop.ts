import { Square } from '../board'
import { PieceMoveGenerator } from '../move-generator'

import { DirectionIndex, Move, MoveGeneratorUtilities } from './utils'

export class BishopMoveGenerator implements PieceMoveGenerator {
  constructor(private utils: MoveGeneratorUtilities) {}

  public generateMoves(fromIndex: number, fromSquare: Square): Move[] {
    return this.generateAttackedIndexes(fromIndex, fromSquare).map((index) => {
      return this.utils.generateMove(
        fromIndex,
        index,
        this.utils.board.getSquare(index)
      )
    })
  }

  public generateAttackedIndexes(fromIndex: number, square: Square): number[] {
    return [
      ...this.utils.generateSlidingAttackedIndexes(
        fromIndex,
        square,
        DirectionIndex.NorthEast
      ),
      ...this.utils.generateSlidingAttackedIndexes(
        fromIndex,
        square,
        DirectionIndex.SouthEast
      ),
      ...this.utils.generateSlidingAttackedIndexes(
        fromIndex,
        square,
        DirectionIndex.SouthWest
      ),
      ...this.utils.generateSlidingAttackedIndexes(
        fromIndex,
        square,
        DirectionIndex.NorthWest
      ),
    ]
  }
}
