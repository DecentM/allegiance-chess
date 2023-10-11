import { Square } from '../board'
import { PieceMoveGenerator } from '../move-generator'

import { DirectionIndex, Move, MoveGeneratorUtilities } from './utils'

export class BishopMoveGenerator implements PieceMoveGenerator {
  constructor(private utils: MoveGeneratorUtilities) {}

  public generateMoves(fromIndex: number, fromSquare: Square): Move[] {
    return [
      ...this.utils.generateSlidingMoves(
        fromIndex,
        fromSquare,
        DirectionIndex.NorthEast
      ),
      ...this.utils.generateSlidingMoves(
        fromIndex,
        fromSquare,
        DirectionIndex.SouthEast
      ),
      ...this.utils.generateSlidingMoves(
        fromIndex,
        fromSquare,
        DirectionIndex.SouthWest
      ),
      ...this.utils.generateSlidingMoves(
        fromIndex,
        fromSquare,
        DirectionIndex.NorthWest
      ),
    ]
  }
}
