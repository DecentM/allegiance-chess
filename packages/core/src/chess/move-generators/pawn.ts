import { Vector2 } from '../../lib/vector2'
import { PieceMoveGenerator } from '../move-generator'
import { Colour, Board, Square } from '../board'
import { Move, MoveFlag, MoveGeneratorUtilities } from './utils'
import * as Piece from '../piece'

export const PROMOTION_PIECES: Piece.Type[] = [
  Piece.Type.Knight,
  Piece.Type.Bishop,
  Piece.Type.Rook,
  Piece.Type.Queen,
]

export class PawnMoveGenerator implements PieceMoveGenerator {
  constructor(private utils: MoveGeneratorUtilities) {}

  public generateAttackedIndexes(fromIndex: number, square: Square): number[] {
    const result: number[] = []
    const colour = Board.getColour(Board.getAllegiance(square))

    const diagLeftVector =
      colour === Colour.White ? new Vector2(-1, 1) : new Vector2(1, -1)
    const diagLeftIndex = this.utils.getIndexRelative(fromIndex, diagLeftVector)
    const diagLeft = this.utils.board.getSquare(diagLeftIndex)

    if (diagLeft) {
      const diagLeftColour = Board.getColour(Board.getAllegiance(diagLeft))

      if (diagLeftColour !== colour) {
        result.push(diagLeftIndex)
      }
    }

    const diagRightVector =
      colour === Colour.White ? new Vector2(1, 1) : new Vector2(-1, -1)
    const diagRightIndex = this.utils.getIndexRelative(
      fromIndex,
      diagRightVector
    )
    const diagRight = this.utils.board.getSquare(diagRightIndex)

    if (diagRight) {
      const diagRightColour = Board.getColour(Board.getAllegiance(diagRight))

      if (diagRightColour !== colour) {
        result.push(diagRightIndex)
      }
    }

    if (this.utils.board.enPassantTarget === diagLeftIndex) {
      result.push(diagLeftIndex)
    }

    if (this.utils.board.enPassantTarget === diagRightIndex) {
      result.push(diagRightIndex)
    }

    return result
  }

  public generateMoves(fromIndex: number, fromSquare: Square): Move[] {
    const rankIndex = Math.floor(fromIndex / this.utils.board.options.width)
    const colour = Board.getColour(Board.getAllegiance(fromSquare))

    const isStartPosition =
      colour === Colour.White
        ? rankIndex === 1
        : rankIndex === this.utils.board.options.height - 2

    const isBeforeLastRank =
      colour === Colour.White
        ? rankIndex === this.utils.board.options.height - 2
        : rankIndex === 1

    const result: Move[] = []

    const inFrontVector =
      colour === Colour.White ? new Vector2(0, 1) : new Vector2(0, -1)
    const inFrontIndex = this.utils.getIndexRelative(fromIndex, inFrontVector)
    const inFront = this.utils.board.getSquare(inFrontIndex)

    if (!inFront && !isBeforeLastRank) {
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
    const diagLeftIndex = this.utils.getIndexRelative(fromIndex, diagLeftVector)
    const diagLeft = this.utils.board.getSquare(diagLeftIndex)

    if (diagLeft) {
      const diagLeftColour = Board.getColour(Board.getAllegiance(diagLeft))

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
    const diagRightIndex = this.utils.getIndexRelative(
      fromIndex,
      diagRightVector
    )
    const diagRight = this.utils.board.getSquare(diagRightIndex)

    if (diagRight) {
      const diagRightColour = Board.getColour(Board.getAllegiance(diagRight))

      if (diagRightColour !== colour) {
        this.utils.generateWithOffset(
          fromIndex,
          fromSquare,
          diagRightVector,
          result
        )
      }
    }

    // En passant

    if (diagRightIndex === this.utils.board.enPassantTarget) {
      const rightVector =
        colour === Colour.White ? new Vector2(1, 0) : new Vector2(-1, 0)
      const rightIndex = this.utils.getIndexRelative(fromIndex, rightVector)
      const right = this.utils.board.getSquare(rightIndex)

      result.push({
        flags: MoveFlag.IsCapture | MoveFlag.IsEnPassant,
        from: fromIndex,
        to: diagRightIndex,
        promotion: null,
        undo: {
          captures: {
            index: rightIndex,
            square: right,
          },
        },
      })
    }

    if (diagLeftIndex === this.utils.board.enPassantTarget) {
      const leftVector =
        colour === Colour.White ? new Vector2(-1, 0) : new Vector2(1, 0)
      const leftIndex = this.utils.getIndexRelative(fromIndex, leftVector)
      const left = this.utils.board.getSquare(leftIndex)

      result.push({
        flags: MoveFlag.IsCapture | MoveFlag.IsEnPassant,
        from: fromIndex,
        to: diagLeftIndex,
        promotion: null,
        undo: {
          captures: {
            index: leftIndex,
            square: left,
          },
        },
      })
    }

    // Promotions

    const generatePossiblePromotionMoves = (toIndex: number): Move[] => {
      return PROMOTION_PIECES.map((piece) => ({
        flags: MoveFlag.IsPromotion,
        from: fromIndex,
        promotion: piece,
        to: toIndex,
        undo: null,
      }))
    }

    if (diagLeft && isBeforeLastRank) {
      const diagLeftColour = Board.getColour(Board.getAllegiance(diagLeft))

      if (diagLeftColour !== colour) {
        result.push(...generatePossiblePromotionMoves(diagLeftIndex))
      }
    }

    if (diagRight && isBeforeLastRank) {
      const diagRightColour = Board.getColour(Board.getAllegiance(diagRight))

      if (diagRightColour !== colour) {
        result.push(...generatePossiblePromotionMoves(diagRightIndex))
      }
    }

    if (!inFront && isBeforeLastRank) {
      result.push(...generatePossiblePromotionMoves(inFrontIndex))
    }

    return result
  }
}
