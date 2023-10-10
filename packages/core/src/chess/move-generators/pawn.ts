import { Vector2 } from '../../lib/vector2'
import { PieceMoveGenerator } from '../move-generator'
import { Colour, NeoBoard, Square } from '../neo-board'
import { Move, MoveFlag, MoveGeneratorUtilities } from './utils'

export class PawnMoveGenerator implements PieceMoveGenerator {
  constructor(private utils: MoveGeneratorUtilities) {}

  public generateMoves(fromIndex: number, fromSquare: Square): Move[] {
    const rankIndex = Math.floor(fromIndex / this.utils.board.options.width)
    const square = this.utils.board.getSquare(fromIndex)
    const colour = NeoBoard.getColour(NeoBoard.getAllegiance(square))
    const isStartPosition =
      colour === Colour.White
        ? rankIndex === 1
        : rankIndex === this.utils.board.options.height - 2

    const result: Move[] = []

    const inFrontVector =
      colour === Colour.White ? new Vector2(0, 1) : new Vector2(0, -1)
    const inFront = this.utils.board.getSquare(
      this.utils.getIndexRelative(fromIndex, inFrontVector)
    )

    if (!inFront) {
      this.utils.generateWithOffset(
        fromIndex,
        fromSquare,
        inFrontVector,
        result
      )

      const inFront2Vector =
        colour === Colour.White ? new Vector2(0, 2) : new Vector2(0, -2)
      const inFront2 = this.utils.board.getSquare(
        this.utils.getIndexRelative(fromIndex, inFront2Vector)
      )

      if (isStartPosition && !inFront2) {
        this.utils.generateWithOffset(
          fromIndex,
          fromSquare,
          inFront2Vector,
          result
        )
      }
    }

    const diagLeftVector =
      colour === Colour.White ? new Vector2(-1, 1) : new Vector2(1, -1)
    const diagLeft = this.utils.board.getSquare(
      this.utils.getIndexRelative(fromIndex, diagLeftVector)
    )

    if (diagLeft) {
      const diagLeftColour = NeoBoard.getColour(
        NeoBoard.getAllegiance(diagLeft)
      )

      if (diagLeftColour !== colour) {
        this.utils.generateWithOffset(
          fromIndex,
          fromSquare,
          diagLeftVector,
          result
        )
      }
    }

    const diagRightVector =
      colour === Colour.White ? new Vector2(1, 1) : new Vector2(-1, -1)
    const diagRight = this.utils.board.getSquare(
      this.utils.getIndexRelative(fromIndex, diagRightVector)
    )

    if (diagRight) {
      const diagRightColour = NeoBoard.getColour(
        NeoBoard.getAllegiance(diagRight)
      )

      if (diagRightColour !== colour) {
        this.utils.generateWithOffset(
          fromIndex,
          fromSquare,
          diagRightVector,
          result
        )
      }
    }

    const isBeforeLastRank =
      colour === Colour.White
        ? rankIndex === this.utils.board.options.height - 2
        : rankIndex === 1

    if (isBeforeLastRank && !inFront) {
      this.utils.generateWithOffset(
        fromIndex,
        fromSquare,
        inFrontVector,
        result
      )

      result[result.length - 1].flags |= MoveFlag.IsPromotion
    }

    // TODO: En passant

    return result
  }
}
