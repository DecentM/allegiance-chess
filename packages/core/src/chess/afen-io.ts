import VError from 'verror'

import { CastlingRight, Colour, Board, BoardMemoryAccess } from './board'

import * as Piece from './piece'
import * as Afen from '../afen'

export class AfenIO {
  private static typeToAfenPiece(type: Piece.Type): Afen.Piece {
    switch (type) {
      case Piece.Type.Bishop:
        return 'B'

      case Piece.Type.King:
        return 'K'

      case Piece.Type.Knight:
        return 'N'

      case Piece.Type.Pawn:
        return null

      case Piece.Type.Queen:
        return 'Q'

      case Piece.Type.Rook:
        return 'R'
    }
  }

  private static afenPieceToType(value: Afen.Piece): Piece.Type {
    switch (value) {
      case 'B':
        return Piece.Type.Bishop

      case 'K':
        return Piece.Type.King

      case 'N':
        return Piece.Type.Knight

      case null:
        return Piece.Type.Pawn

      case 'Q':
        return Piece.Type.Queen

      case 'R':
        return Piece.Type.Rook
    }
  }

  private static allegianceToAfenAllegiance(
    allegiance: Piece.Allegiance
  ): Afen.Allegiance {
    switch (allegiance) {
      case Piece.Allegiance.Black:
        return Afen.Allegiance.Black

      case Piece.Allegiance.DarkGrey:
        return Afen.Allegiance.DarkGrey

      case Piece.Allegiance.LightGrey:
        return Afen.Allegiance.LightGrey

      case Piece.Allegiance.White:
        return Afen.Allegiance.White
    }
  }

  private static afenAllegianceToAllegiance(
    afenAllegiance: Afen.Allegiance
  ): Piece.Allegiance {
    switch (afenAllegiance) {
      case Afen.Allegiance.Black:
        return Piece.Allegiance.Black

      case Afen.Allegiance.DarkGrey:
        return Piece.Allegiance.DarkGrey

      case Afen.Allegiance.LightGrey:
        return Piece.Allegiance.LightGrey

      case Afen.Allegiance.White:
        return Piece.Allegiance.White
    }
  }

  private static coordsFromIndex(
    index: number,
    width: number
  ): Afen.Coordinates {
    return {
      file: ((index % width) + 1) as Afen.File,
      rank: (Math.floor(index / width) + 1) as Afen.Rank,
    }
  }

  private static indexFromCoords(
    coords: Afen.Coordinates,
    width: number
  ): number {
    return coords.file - 1 + (coords.rank - 1) * width
  }

  constructor(private board: Board, private memoryAccess: BoardMemoryAccess) {}

  public export() {
    return Afen.write(this.exportAst())
  }

  public exportAst(): Afen.RootNode {
    const memory = this.memoryAccess.getMemory()
    const ast: Afen.RootNode = {
      kind: 'ast',
      children: [],
    }

    let skip = 0

    for (let i = 0; i < memory.length; i++) {
      if (memory[i]) {
        if (skip) {
          ast.children.push({ kind: 'skip', value: skip })
          skip = 0
        }

        ast.children.push({
          kind: 'piece',
          value: {
            piece: AfenIO.typeToAfenPiece(Board.getType(memory[i])),
            allegiance: AfenIO.allegianceToAfenAllegiance(
              Board.getAllegiance(memory[i])
            ),
          },
        })
      } else {
        skip++
      }

      if ((i + 1) % 8 === 0 && skip) {
        ast.children.push({ kind: 'skip', value: skip })
        skip = 0
      }
    }

    if (skip) {
      ast.children.push({ kind: 'skip', value: skip })
    }

    ast.children.push({
      kind: 'active-colour',
      value: this.board.activeColour === Colour.White ? 'white' : 'black',
    })

    const castlingNode: Afen.CastlingRightsNode = {
      kind: 'castling-rights',
      value: { black: [], white: [] },
    }

    if (this.board.hasCastlingRight(CastlingRight.WhiteKing))
      castlingNode.value.white.push('king')

    if (this.board.hasCastlingRight(CastlingRight.WhiteQueen))
      castlingNode.value.white.push('queen')

    if (this.board.hasCastlingRight(CastlingRight.BlackKing))
      castlingNode.value.black.push('king')

    if (this.board.hasCastlingRight(CastlingRight.BlackQueen))
      castlingNode.value.black.push('queen')

    if (
      castlingNode.value.white.length > 0 ||
      castlingNode.value.black.length > 0
    ) {
      ast.children.push(castlingNode)
    }

    if (this.board.enPassantTarget !== -1) {
      ast.children.push({
        kind: 'en-passant-targets',
        value: AfenIO.coordsFromIndex(
          this.board.enPassantTarget,
          this.board.options.width
        ),
      })
    }

    ast.children.push({
      kind: 'halfmove-clock',
      value: this.board.halfmoveClock,
    })

    ast.children.push({
      kind: 'fullmove-number',
      value: this.board.fullmoveNumber,
    })

    return ast
  }

  public import(input: string) {
    this.importAst(Afen.parse(Afen.tokenize(input)))
  }

  public importAst(afen: Afen.RootNode) {
    let index = 0

    for (const node of afen.children) {
      if (node.kind === 'skip') {
        index += node.value
        continue
      }

      if (node.kind === 'piece') {
        const squareIndex =
          this.board.options.width * this.board.options.height - index - 1

        this.board.setSquare(
          squareIndex,
          AfenIO.afenPieceToType(node.value.piece) |
            AfenIO.afenAllegianceToAllegiance(node.value.allegiance)
        )
        index++
        continue
      }

      if (node.kind === 'en-passant-targets') {
        this.board.enPassantTarget = AfenIO.indexFromCoords(
          node.value,
          this.board.options.width
        )
        continue
      }

      if (node.kind === 'castling-rights') {
        node.value.black.forEach((value) => {
          this.board.addCastlingRight(
            value === 'king'
              ? CastlingRight.BlackKing
              : CastlingRight.BlackQueen
          )
        })

        node.value.white.forEach((value) => {
          this.board.addCastlingRight(
            value === 'king'
              ? CastlingRight.WhiteKing
              : CastlingRight.WhiteQueen
          )
        })

        continue
      }

      if (node.kind === 'active-colour') {
        this.board.activeColour =
          node.value === 'white' ? Colour.White : Colour.Black
        continue
      }

      if (node.kind === 'fullmove-number') {
        this.board.fullmoveNumber = node.value
        continue
      }

      if (node.kind === 'halfmove-clock') {
        this.board.halfmoveClock = node.value
        continue
      }

      throw new VError(
        `Unhandled node while importing AFEN: ${
          node['kind'] ?? JSON.stringify(node, null, 2)
        }`
      )
    }
  }
}
