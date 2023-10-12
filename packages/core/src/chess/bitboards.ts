import { Board, Square } from './board'
import * as Piece from './piece'

export class Bitboards {
  public white = 0n
  public lightGrey = 0n
  public darkGrey = 0n
  public black = 0n

  public pawns = 0n
  public rooks = 0n
  public knights = 0n
  public bishops = 0n
  public kings = 0n
  public queens = 0n

  public get whitePawns() {
    return this.white & this.pawns
  }
  public get lightGreyPawns() {
    return this.lightGrey & this.pawns
  }
  public get darkGreyPawns() {
    return this.darkGrey & this.pawns
  }
  public get blackPawns() {
    return this.black & this.pawns
  }

  public get whiteRooks() {
    return this.white & this.rooks
  }
  public get lightGreyRooks() {
    return this.lightGrey & this.rooks
  }
  public get darkGreyRooks() {
    return this.darkGrey & this.rooks
  }
  public get blackRooks() {
    return this.black & this.rooks
  }

  public get whiteKnights() {
    return this.white & this.knights
  }
  public get lightGreyKnights() {
    return this.lightGrey & this.knights
  }
  public get darkGreyKnights() {
    return this.darkGrey & this.knights
  }
  public get blackKnights() {
    return this.black & this.knights
  }

  public get whiteBishops() {
    return this.white & this.bishops
  }
  public get lightGreyBishops() {
    return this.lightGrey & this.bishops
  }
  public get darkGreyBishops() {
    return this.darkGrey & this.bishops
  }
  public get blackBishops() {
    return this.black & this.bishops
  }

  // Kings cannot be grey, because they must move out of checks
  public get whiteKings() {
    return this.white & this.kings
  }
  public get blackKings() {
    return this.black & this.kings
  }

  public get whiteQueens() {
    return this.white & this.queens
  }
  public get lightGreyQueens() {
    return this.lightGrey & this.queens
  }
  public get darkGreyv() {
    return this.darkGrey & this.queens
  }
  public get blackQueens() {
    return this.black & this.queens
  }

  public updateSquare(index: number, square: Square) {
    if (!square) {
      this.white = Bitboards.clearIndex(this.white, BigInt(index))
      this.lightGrey = Bitboards.clearIndex(this.lightGrey, BigInt(index))
      this.darkGrey = Bitboards.clearIndex(this.darkGrey, BigInt(index))
      this.black = Bitboards.clearIndex(this.black, BigInt(index))

      this.pawns = Bitboards.clearIndex(this.pawns, BigInt(index))
      this.rooks = Bitboards.clearIndex(this.rooks, BigInt(index))
      this.knights = Bitboards.clearIndex(this.knights, BigInt(index))
      this.bishops = Bitboards.clearIndex(this.bishops, BigInt(index))
      this.kings = Bitboards.clearIndex(this.kings, BigInt(index))
      this.queens = Bitboards.clearIndex(this.queens, BigInt(index))

      return
    }

    const type = Board.getType(square)
    const allegiance = Board.getAllegiance(square)

    switch (type) {
      case Piece.Type.Bishop:
        this.bishops = Bitboards.setIndex(this.bishops, BigInt(index))
        break

      case Piece.Type.King:
        this.kings = Bitboards.setIndex(this.kings, BigInt(index))
        break

      case Piece.Type.Knight:
        this.knights = Bitboards.setIndex(this.knights, BigInt(index))
        break

      case Piece.Type.Pawn:
        this.pawns = Bitboards.setIndex(this.pawns, BigInt(index))
        break

      case Piece.Type.Queen:
        this.queens = Bitboards.setIndex(this.queens, BigInt(index))
        break

      case Piece.Type.Rook:
        this.rooks = Bitboards.setIndex(this.rooks, BigInt(index))
        break
    }

    switch (allegiance) {
      case Piece.Allegiance.Black:
        this.black = Bitboards.setIndex(this.black, BigInt(index))
        break

      case Piece.Allegiance.DarkGrey:
        this.darkGrey = Bitboards.setIndex(this.darkGrey, BigInt(index))
        break

      case Piece.Allegiance.LightGrey:
        this.lightGrey = Bitboards.setIndex(this.lightGrey, BigInt(index))
        break

      case Piece.Allegiance.White:
        this.white = Bitboards.setIndex(this.white, BigInt(index))
        break
    }
  }

  public static toggleIndex(bitboard: bigint, index: bigint) {
    return bitboard ^ (1n << index)
  }

  public static clearIndex(bitboard: bigint, index: bigint) {
    return bitboard & ~(1n << index)
  }

  public static setIndex(bitboard: bigint, index: bigint) {
    return bitboard | (1n << index)
  }

  public static getIndex(bitboard: bigint, index: bigint) {
    return ((bitboard >> index) & 1n) !== 0n
  }
}
