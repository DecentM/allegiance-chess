import { PieceMoveGenerator } from '../move-generator'
import { Square } from '../board'
import { DirectionIndex, Move, MoveGeneratorUtilities } from './utils'

export class QueenMoveGenerator implements PieceMoveGenerator {
  constructor(private utils: MoveGeneratorUtilities) {}

  public generateAttackedIndexes(fromIndex: number, square: Square): number[] {
    return this.generateMoves(fromIndex, square).map((move) => move.to)
  }

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
        DirectionIndex.NorthEast
      ),
      ...this.utils.generateSlidingMoves(
        fromIndex,
        fromSquare,
        DirectionIndex.East
      ),
      ...this.utils.generateSlidingMoves(
        fromIndex,
        fromSquare,
        DirectionIndex.SouthEast
      ),
      ...this.utils.generateSlidingMoves(
        fromIndex,
        fromSquare,
        DirectionIndex.South
      ),
      ...this.utils.generateSlidingMoves(
        fromIndex,
        fromSquare,
        DirectionIndex.SouthWest
      ),
      ...this.utils.generateSlidingMoves(
        fromIndex,
        fromSquare,
        DirectionIndex.West
      ),
      ...this.utils.generateSlidingMoves(
        fromIndex,
        fromSquare,
        DirectionIndex.NorthWest
      ),
    ]
  }
}
