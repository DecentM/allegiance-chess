import { Vector2 } from '../../lib/vector2'
import { PieceMoveGenerator } from '../move-generator'
import { Square } from '../neo-board'
import { Move, MoveGeneratorUtilities } from './utils'

export class KingMoveGenerator implements PieceMoveGenerator {
  constructor(private utils: MoveGeneratorUtilities) {}

  public generateMoves(fromIndex: number, fromSquare: Square): Move[] {
    const result: Move[] = []

    this.utils.generateWithOffset(
      fromIndex,
      fromSquare,
      new Vector2(0, 1),
      result
    )
    this.utils.generateWithOffset(
      fromIndex,
      fromSquare,
      new Vector2(1, 1),
      result
    )
    this.utils.generateWithOffset(
      fromIndex,
      fromSquare,
      new Vector2(1, 0),
      result
    )
    this.utils.generateWithOffset(
      fromIndex,
      fromSquare,
      new Vector2(1, -1),
      result
    )
    this.utils.generateWithOffset(
      fromIndex,
      fromSquare,
      new Vector2(0, -1),
      result
    )
    this.utils.generateWithOffset(
      fromIndex,
      fromSquare,
      new Vector2(-1, -1),
      result
    )
    this.utils.generateWithOffset(
      fromIndex,
      fromSquare,
      new Vector2(-1, 0),
      result
    )
    this.utils.generateWithOffset(
      fromIndex,
      fromSquare,
      new Vector2(-1, 1),
      result
    )

    return result
  }
}
