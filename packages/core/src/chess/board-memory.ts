import { VError } from 'verror'
import cloneDeep from 'lodash.clonedeep'

import { File, Piece, Rank } from '../notation/declarations'
import { Coordinates, Node } from '../notation/parser'

import { PieceAllegiance } from './board'
import { tokenize } from '../afen/tokenizer'
import { parse } from '../afen/parser'
import { fileToLetter } from '../lib/notation'
import { allegianceSide } from '../lib/allegiance'

export type BoardSquare = {
  piece: Piece | null
  allegiance: PieceAllegiance
}

// memory[rank][file] = BoardSquare
type Memory = (BoardSquare | null)[][]

type StandaloneBoardSquare = BoardSquare & Coordinates

export class BoardMemory {
  private memory: Memory = []

  public activeColour: 'black' | 'white'

  public enPassantTarget: Coordinates | null

  private _castlingRights: Array<{
    colour: 'white' | 'black'
    side: 'queen' | 'king'
  }>

  public halfmoveClock: number

  public fullmoveNumber: number

  public moveHistory: Node[]

  public clone() {
    const memory = new BoardMemory()

    memory.memory = cloneDeep(this.memory)
    memory.activeColour = this.activeColour
    memory.enPassantTarget = cloneDeep(this.enPassantTarget)
    memory._castlingRights = cloneDeep(this._castlingRights)
    memory.halfmoveClock = this.halfmoveClock
    memory.fullmoveNumber = this.fullmoveNumber
    memory.moveHistory = cloneDeep(this.moveHistory)

    return memory
  }

  public removeCastlingRights(
    colour: 'white' | 'black',
    side: 'queen' | 'king'
  ) {
    const index = this._castlingRights.findIndex(
      (right) => right.colour === colour && right.side === side
    )

    if (index === -1) {
      return
    }

    this._castlingRights.splice(index, 1)
  }

  public castlingRights(side: 'white' | 'black'): Array<'queen' | 'king'> {
    return this._castlingRights
      .filter((right) => right.colour === side)
      .map((value) => value.side)
  }

  private clear() {
    this.memory = []
    this.activeColour = 'white'
    this.enPassantTarget = null
    this._castlingRights = []
    this.halfmoveClock = 0
    this.fullmoveNumber = 0
    this.moveHistory = []

    for (let rank = 0; rank < 8; rank++) {
      this.memory[rank] = []

      for (let file = 0; file < 8; file++) {
        this.memory[rank][file] = null
      }
    }
  }

  constructor() {
    this.clear()
  }

  /**
   * @internal For debugging
   */
  public dump(): string {
    const squares = this.getSquares()

    const ranks = Array.from({ length: 8 }).map(() => {
      return Array.from({ length: 8 }).map(() => '.')
    })
    let result = ''

    squares.filter(Boolean).forEach((square) => {
      ranks[square.rank - 1][square.file - 1] =
        allegianceSide(square.allegiance) === 'white'
          ? square.piece?.toUpperCase() ?? 'P'
          : square.piece?.toLowerCase() ?? 'p'
    })

    for (let i = 7; i >= 0; i--) {
      result += `${i + 1} `
      result += ranks[i].map((item) => item).join(' ')
      result += '\n'
    }

    result += `  ${ranks[0]
      .map((_, fileIndex) => fileToLetter((fileIndex + 1) as File))
      .join(' ')}`

    return result
  }

  public getSquares(): StandaloneBoardSquare[] {
    const result: StandaloneBoardSquare[] = []

    this.memory.forEach((files, rank) => {
      files.forEach((square, file) => {
        if (!square) {
          result.push(null)
          return
        }

        result.push({
          allegiance: square.allegiance,
          piece: square.piece,
          file: (file + 1) as File,
          rank: (rank + 1) as Rank,
        })
      })
    })

    return result
  }

  public getSquare(coords: Coordinates) {
    if (!coords) {
      throw new VError('Attempted to get square with no coordinates')
    }

    return this.memory[coords.rank - 1][coords.file - 1]
  }

  public setSquare(coords: Coordinates, square: BoardSquare | null) {
    this.memory[coords.rank - 1][coords.file - 1] = square
  }

  public toAFEN(): string {
    const rankStrings: string[] = []
    const blackCastling = this.castlingRights('black')
    const whiteCastling = this.castlingRights('white')
    let skip = 0

    for (let i = this.memory.length - 1; i >= 0; i--) {
      const file = this.memory[i]
      let rankString = ''

      file.forEach((square) => {
        if (!square) {
          skip++
          return
        }

        if (skip) {
          rankString += `${skip}`
          skip = 0
        }

        const side = allegianceSide(square.allegiance)

        const hasAllegiance =
          square.allegiance === PieceAllegiance.DarkGrey ||
          square.allegiance === PieceAllegiance.LightGrey

        const pawn = side === 'white' ? 'P' : 'p'
        const piece =
          side === 'white'
            ? square.piece?.toUpperCase()
            : square.piece?.toLowerCase()

        rankString += piece || pawn

        if (hasAllegiance) {
          rankString += '>'
        }
      })

      if (skip) {
        rankString += `${skip}`
        skip = 0
      }

      rankStrings.push(rankString)
    }

    let castling = ''

    if (blackCastling.includes('king')) {
      castling += 'k'
    }

    if (blackCastling.includes('queen')) {
      castling += 'q'
    }

    if (whiteCastling.includes('king')) {
      castling += 'K'
    }

    if (whiteCastling.includes('queen')) {
      castling += 'Q'
    }

    const enPassantTarget = this.enPassantTarget
      ? `${fileToLetter(this.enPassantTarget.file)}${this.enPassantTarget.rank}`
      : '-'

    return [
      rankStrings.join('/'),
      this.activeColour === 'white' ? 'w' : 'b',
      castling || '-',
      enPassantTarget,
      this.halfmoveClock,
      this.fullmoveNumber,
    ].join(' ')
  }

  public importAFEN(afen: string) {
    this.clear()

    const tokens = tokenize(afen)
    const ast = parse(tokens)

    let rank: Rank = 8
    let file: File = 1

    ast.children.forEach((node) => {
      if (file > 8) {
        rank--
        file = 1
      }

      if (node.kind === 'piece') {
        this.setSquare({ file, rank }, node.value)
        file++
        return
      }

      if (node.kind === 'skip') {
        file += node.value
        return
      }

      if (node.kind === 'en-passant-targets') {
        this.enPassantTarget = node.value
        return
      }

      if (node.kind === 'castling-rights') {
        node.value.black.forEach((value) => {
          this._castlingRights.push({
            colour: 'black',
            side: value,
          })
        })

        node.value.white.forEach((value) => {
          this._castlingRights.push({
            colour: 'white',
            side: value,
          })
        })

        return
      }

      if (node.kind === 'active-colour') {
        this.activeColour = node.value
        return
      }

      if (node.kind === 'fullmove-number') {
        this.fullmoveNumber = node.value
        return
      }

      if (node.kind === 'halfmove-clock') {
        this.halfmoveClock = node.value
        return
      }

      throw new VError(
        `Unhandled node while importing AFEN: ${
          node['kind'] ?? JSON.stringify(node, null, 2)
        }`
      )
    })
  }
}
