import { Vector2 } from '../../lib/vector2'
import { PieceMoveGenerator } from '../move-generator'
import { Board, CastlingRight, Colour, Square } from '../board'
import { Move, MoveFlag, MoveGeneratorUtilities } from './utils'
import { getIndexForCoords } from '../../lib/board'
import { Rank } from '../../notation'
import * as Piece from '../piece'

export class KingMoveGenerator implements PieceMoveGenerator {
  constructor(private utils: MoveGeneratorUtilities) {}

  public generateAttackedIndexes(fromIndex: number): number[] {
    const result: number[] = []

    result.push(this.utils.getIndexRelative(fromIndex, new Vector2(0, 1)))
    result.push(this.utils.getIndexRelative(fromIndex, new Vector2(1, 1)))
    result.push(this.utils.getIndexRelative(fromIndex, new Vector2(1, 0)))
    result.push(this.utils.getIndexRelative(fromIndex, new Vector2(1, -1)))
    result.push(this.utils.getIndexRelative(fromIndex, new Vector2(0, -1)))
    result.push(this.utils.getIndexRelative(fromIndex, new Vector2(-1, -1)))
    result.push(this.utils.getIndexRelative(fromIndex, new Vector2(-1, 0)))
    result.push(this.utils.getIndexRelative(fromIndex, new Vector2(-1, 1)))

    return result.filter((index) => index !== -1)
  }

  public generateMoves(fromIndex: number, fromSquare: Square): Move[] {
    const result: Move[] = []
    const colour = Board.getColour(Board.getAllegiance(fromSquare))

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

    const kingCastling = this.utils.board.hasCastlingRight(
      colour === Colour.White
        ? CastlingRight.WhiteKing
        : CastlingRight.BlackKing
    )
    const queenCastling = this.utils.board.hasCastlingRight(
      colour === Colour.White
        ? CastlingRight.WhiteQueen
        : CastlingRight.BlackQueen
    )
    const homeRank =
      colour === Colour.White ? 1 : (this.utils.board.options.height as Rank)

    const a = this.utils.board.getSquare(
      getIndexForCoords({ file: 1, rank: homeRank })
    )
    const b = this.utils.board.getSquare(
      getIndexForCoords({ file: 2, rank: homeRank })
    )
    const c = this.utils.board.getSquare(
      getIndexForCoords({ file: 3, rank: homeRank })
    )
    const d = this.utils.board.getSquare(
      getIndexForCoords({ file: 4, rank: homeRank })
    )
    const f = this.utils.board.getSquare(
      getIndexForCoords({ file: 6, rank: homeRank })
    )
    const g = this.utils.board.getSquare(
      getIndexForCoords({ file: 7, rank: homeRank })
    )
    const h = this.utils.board.getSquare(
      getIndexForCoords({ file: 8, rank: homeRank })
    )

    // TODO: No castling through checked indices

    if (
      kingCastling &&
      !f &&
      !g &&
      h &&
      Board.getType(h) === Piece.Type.Rook &&
      Board.getColour(Board.getAllegiance(h)) === colour
    ) {
      result.push({
        flags: MoveFlag.IsCastle,
        promotion: null,
        undo: null,
        from: fromIndex,
        to: this.utils.getIndexRelative(fromIndex, new Vector2(2, 0)),
      })
    }

    if (
      queenCastling &&
      !b &&
      !c &&
      !d &&
      a &&
      Board.getType(a) === Piece.Type.Rook &&
      Board.getColour(Board.getAllegiance(a)) === colour
    ) {
      result.push({
        flags: MoveFlag.IsCastle,
        promotion: null,
        undo: null,
        from: fromIndex,
        to: this.utils.getIndexRelative(fromIndex, new Vector2(-2, 0)),
      })
    }

    return result
  }
}
