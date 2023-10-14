import { Vector2 } from '../../lib/vector2'
import { PieceMoveGenerator } from '../move-generator'
import { Board, CastlingRight, Colour, Square } from '../board'
import { Move, MoveFlag, MoveGeneratorUtilities } from './utils'
import { getIndexForCoords } from '../../lib/board'
import { Rank } from '../../notation'
import * as Piece from '../piece'

export class KingMoveGenerator implements PieceMoveGenerator {
  constructor(private utils: MoveGeneratorUtilities) {}

  public generateAttackedIndexes(
    fromIndex: number,
    fromSquare: Square
  ): number[] {
    const colour = Board.getColour(Board.getAllegiance(fromSquare))

    const result: number[] = []

    const n = this.utils.getIndexRelative(fromIndex, new Vector2(0, 1))
    const ne = this.utils.getIndexRelative(fromIndex, new Vector2(1, 1))
    const e = this.utils.getIndexRelative(fromIndex, new Vector2(1, 0))
    const se = this.utils.getIndexRelative(fromIndex, new Vector2(1, -1))
    const s = this.utils.getIndexRelative(fromIndex, new Vector2(0, -1))
    const sw = this.utils.getIndexRelative(fromIndex, new Vector2(-1, -1))
    const w = this.utils.getIndexRelative(fromIndex, new Vector2(-1, 0))
    const nw = this.utils.getIndexRelative(fromIndex, new Vector2(-1, 1))

    const ns = this.utils.board.getSquare(n)
    const nes = this.utils.board.getSquare(ne)
    const es = this.utils.board.getSquare(e)
    const ses = this.utils.board.getSquare(se)
    const ss = this.utils.board.getSquare(s)
    const sws = this.utils.board.getSquare(sw)
    const ws = this.utils.board.getSquare(w)
    const nws = this.utils.board.getSquare(nw)

    if (
      n !== -1 &&
      (!ns || Board.getColour(Board.getAllegiance(ns)) !== colour)
    )
      result.push(n)
    if (
      ne !== -1 &&
      (!nes || Board.getColour(Board.getAllegiance(nes)) !== colour)
    )
      result.push(ne)
    if (
      e !== -1 &&
      (!es || Board.getColour(Board.getAllegiance(es)) !== colour)
    )
      result.push(e)
    if (
      se !== -1 &&
      (!ses || Board.getColour(Board.getAllegiance(ses)) !== colour)
    )
      result.push(se)
    if (
      s !== -1 &&
      (!ss || Board.getColour(Board.getAllegiance(ss)) !== colour)
    )
      result.push(s)
    if (
      sw !== -1 &&
      (!sws || Board.getColour(Board.getAllegiance(sws)) !== colour)
    )
      result.push(sw)
    if (
      w !== -1 &&
      (!ws || Board.getColour(Board.getAllegiance(ws)) !== colour)
    )
      result.push(w)
    if (
      nw !== -1 &&
      (!nws || Board.getColour(Board.getAllegiance(nws)) !== colour)
    )
      result.push(nw)

    return result
  }

  public generateMoves(
    fromIndex: number,
    fromSquare: Square,
    attackedIndexesByOpponent: number[]
  ): Move[] {
    const result: Move[] = []
    const colour = Board.getColour(Board.getAllegiance(fromSquare))

    for (const attackedIndex of this.generateAttackedIndexes(
      fromIndex,
      fromSquare
    )) {
      result.push(
        this.utils.generateMove(
          fromIndex,
          attackedIndex,
          this.utils.board.getSquare(attackedIndex)
        )
      )
    }

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

    if (kingCastling) {
      const fIndex = getIndexForCoords({ file: 6, rank: homeRank })
      const f = this.utils.board.getSquare(fIndex)
      const gIndex = getIndexForCoords({ file: 7, rank: homeRank })
      const g = this.utils.board.getSquare(gIndex)
      const hIndex = getIndexForCoords({ file: 8, rank: homeRank })
      const h = this.utils.board.getSquare(hIndex)

      if (
        !f &&
        !g &&
        h &&
        !attackedIndexesByOpponent.includes(fIndex) &&
        !attackedIndexesByOpponent.includes(gIndex) &&
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
    }

    if (queenCastling) {
      const a = this.utils.board.getSquare(
        getIndexForCoords({ file: 1, rank: homeRank })
      )
      const bIndex = getIndexForCoords({ file: 2, rank: homeRank })
      const b = this.utils.board.getSquare(bIndex)
      const cIndex = getIndexForCoords({ file: 3, rank: homeRank })
      const c = this.utils.board.getSquare(cIndex)
      const dIndex = getIndexForCoords({ file: 4, rank: homeRank })
      const d = this.utils.board.getSquare(dIndex)

      if (
        !b &&
        !c &&
        !d &&
        a &&
        !attackedIndexesByOpponent.includes(bIndex) &&
        !attackedIndexesByOpponent.includes(cIndex) &&
        !attackedIndexesByOpponent.includes(dIndex) &&
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
    }

    return result
  }
}
