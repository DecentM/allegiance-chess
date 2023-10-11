import { PieceMoveGenerator } from '../move-generator'
import { Square } from '../board'
import { DirectionIndex, Move, MoveGeneratorUtilities } from './utils'

export class RookMoveGenerator implements PieceMoveGenerator {
  constructor(private utils: MoveGeneratorUtilities) {}

  public generateMoves(fromIndex: number, fromSquare: Square): Move[] {
    return [
      ...this.utils.generateSlidingMoves(
        fromIndex,
        fromSquare,
        DirectionIndex.North
      ),
      ...this.utils.generateSlidingMoves(
        fromIndex,
        fromSquare,
        DirectionIndex.East
      ),
      ...this.utils.generateSlidingMoves(
        fromIndex,
        fromSquare,
        DirectionIndex.South
      ),
      ...this.utils.generateSlidingMoves(
        fromIndex,
        fromSquare,
        DirectionIndex.West
      ),
    ]
  }
}
