import { Vector2 } from '../../lib/vector2'
import { PieceMoveGenerator } from '../move-generator'
import { Square } from '../board'
import { Move, MoveGeneratorUtilities } from './utils'

export class KnightMoveGenerator implements PieceMoveGenerator {
  constructor(private utils: MoveGeneratorUtilities) {}

  public generateMoves(fromIndex: number, fromSquare: Square): Move[] {
    const result: Move[] = []

    this.utils.generateWithOffset(
      fromIndex,
      fromSquare,
      new Vector2(1, 2),
      result
    )
    this.utils.generateWithOffset(
      fromIndex,
      fromSquare,
      new Vector2(2, 1),
      result
    )
    this.utils.generateWithOffset(
      fromIndex,
      fromSquare,
      new Vector2(2, -1),
      result
    )
    this.utils.generateWithOffset(
      fromIndex,
      fromSquare,
      new Vector2(1, -2),
      result
    )
    this.utils.generateWithOffset(
      fromIndex,
      fromSquare,
      new Vector2(-1, -2),
      result
    )
    this.utils.generateWithOffset(
      fromIndex,
      fromSquare,
      new Vector2(-2, -1),
      result
    )
    this.utils.generateWithOffset(
      fromIndex,
      fromSquare,
      new Vector2(-2, 1),
      result
    )
    this.utils.generateWithOffset(
      fromIndex,
      fromSquare,
      new Vector2(-1, 2),
      result
    )

    return result
  }
}
