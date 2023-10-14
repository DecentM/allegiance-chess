import * as Piece from './piece'

import { BishopMoveGenerator } from './move-generators/bishop'
import { KingMoveGenerator } from './move-generators/king'
import { KnightMoveGenerator } from './move-generators/knight'
import { PawnMoveGenerator } from './move-generators/pawn'
import { QueenMoveGenerator } from './move-generators/queen'
import { RookMoveGenerator } from './move-generators/rook'
import { Board, BoardMemoryAccess, Colour, Square } from './board'
import { Move, MoveGeneratorUtilities } from './move-generators/utils'

export interface PieceMoveGenerator {
  generateMoves(
    fromIndex: number,
    square: Square,
    attackedIndexes: number[]
  ): Move[]
  generateAttackedIndexes(fromIndex: number, square: Square): number[]
}

export class MoveGenerator {
  private pawn: PawnMoveGenerator

  private knight: KnightMoveGenerator

  private queen: QueenMoveGenerator

  private bishop: BishopMoveGenerator

  private king: KingMoveGenerator

  private rook: RookMoveGenerator

  constructor(private board: Board, private memoryAccess: BoardMemoryAccess) {
    const utils = new MoveGeneratorUtilities(board)

    this.pawn = new PawnMoveGenerator(utils)
    this.knight = new KnightMoveGenerator(utils)
    this.queen = new QueenMoveGenerator(utils)
    this.bishop = new BishopMoveGenerator(utils)
    this.king = new KingMoveGenerator(utils)
    this.rook = new RookMoveGenerator(utils)
  }

  public generateMovesForColour(colour: Colour) {
    const memory = this.memoryAccess.getMemory()
    const result: Move[] = []
    const attackedIndexesByOpponent: number[] = []

    for (let i = 0; i < memory.length; i++) {
      const square = memory[i]

      if (!square || Board.getColour(Board.getAllegiance(square)) === colour) {
        continue
      }

      attackedIndexesByOpponent.push(...this.generateAttackedIndexes(i, square))
    }

    for (let i = 0; i < memory.length; i++) {
      const square = memory[i]

      if (!square || Board.getColour(Board.getAllegiance(square)) !== colour) {
        continue
      }

      result.push(...this.generateMoves(i, square, attackedIndexesByOpponent))
    }

    return result
  }

  public generateMoves(
    fromIndex: number,
    square: Square,
    attackedIndexesByOpponent: number[]
  ): Move[] {
    switch (Board.getType(square)) {
      case Piece.Type.King:
        return this.king.generateMoves(
          fromIndex,
          square,
          attackedIndexesByOpponent
        )

      case Piece.Type.Bishop:
        return this.bishop.generateMoves(fromIndex, square)

      case Piece.Type.Knight:
        return this.knight.generateMoves(fromIndex, square)

      case Piece.Type.Pawn:
        return this.pawn.generateMoves(fromIndex, square)

      case Piece.Type.Queen:
        return this.queen.generateMoves(fromIndex, square)

      case Piece.Type.Rook:
        return this.rook.generateMoves(fromIndex, square)
    }
  }

  public generateAttackedIndexes(fromIndex: number, square: Square): number[] {
    switch (Board.getType(square)) {
      case Piece.Type.King:
        return this.king.generateAttackedIndexes(fromIndex, square)

      case Piece.Type.Bishop:
        return this.bishop.generateAttackedIndexes(fromIndex, square)

      case Piece.Type.Knight:
        return this.knight.generateAttackedIndexes(fromIndex, square)

      case Piece.Type.Pawn:
        return this.pawn.generateAttackedIndexes(fromIndex, square)

      case Piece.Type.Queen:
        return this.queen.generateAttackedIndexes(fromIndex, square)

      case Piece.Type.Rook:
        return this.rook.generateAttackedIndexes(fromIndex, square)
    }
  }
}
