import { PieceMoveGenerator } from '../move-generator'
import { Square } from '../board'
import { DirectionIndex, Move, MoveGeneratorUtilities } from './utils'

export class QueenMoveGenerator implements PieceMoveGenerator {
  constructor(private utils: MoveGeneratorUtilities) {}

  public generateAttackedIndexes(fromIndex: number, square: Square): number[] {
    return [
      ...this.utils.generateSlidingAttackedIndexes(
        fromIndex,
        square,
        DirectionIndex.North
      ),
      ...this.utils.generateSlidingAttackedIndexes(
        fromIndex,
        square,
        DirectionIndex.NorthEast
      ),
      ...this.utils.generateSlidingAttackedIndexes(
        fromIndex,
        square,
        DirectionIndex.East
      ),
      ...this.utils.generateSlidingAttackedIndexes(
        fromIndex,
        square,
        DirectionIndex.SouthEast
      ),
      ...this.utils.generateSlidingAttackedIndexes(
        fromIndex,
        square,
        DirectionIndex.South
      ),
      ...this.utils.generateSlidingAttackedIndexes(
        fromIndex,
        square,
        DirectionIndex.SouthWest
      ),
      ...this.utils.generateSlidingAttackedIndexes(
        fromIndex,
        square,
        DirectionIndex.West
      ),
      ...this.utils.generateSlidingAttackedIndexes(
        fromIndex,
        square,
        DirectionIndex.NorthWest
      ),
    ]
  }

  public generateMoves(fromIndex: number, fromSquare: Square): Move[] {
    return this.generateAttackedIndexes(fromIndex, fromSquare).map((index) => {
      return this.utils.generateMove(
        fromIndex,
        index,
        this.utils.board.getSquare(index)
      )
    })
  }
}
