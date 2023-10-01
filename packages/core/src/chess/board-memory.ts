import { VError } from 'verror'
import cloneDeep from 'lodash.clonedeep'

import { File, Piece, Rank } from '../notation/declarations'
import { Coordinates, Node } from '../notation/parser'

import { fileToLetter } from '../lib/notation'
import { allegianceSide } from '../lib/allegiance'

import { CastlingRightsNode, RootNode } from '../afen/parser'

import { PieceAllegiance } from './board'

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

  public toAFEN(): RootNode {
    const ast: RootNode = {
      kind: 'ast',
      children: [],
    }

    let skip = 0

    for (let i = this.memory.length - 1; i >= 0; i--) {
      const rank = this.memory[i]

      for (const square of rank) {
        if (!square) {
          skip++
          continue
        }

        if (skip) {
          ast.children.push({ kind: 'skip', value: skip })
          skip = 0
        }

        ast.children.push({ kind: 'piece', value: square })
      }

      if (skip) {
        ast.children.push({ kind: 'skip', value: skip })
        skip = 0
      }
    }

    ast.children.push({
      kind: 'active-colour',
      value: this.activeColour,
    })

    const castlingNode: CastlingRightsNode = {
      kind: 'castling-rights',
      value: { black: [], white: [] },
    }

    const whiteCastling = this.castlingRights('white')
    const blackCastling = this.castlingRights('black')

    if (whiteCastling.includes('king')) castlingNode.value.white.push('king')
    if (whiteCastling.includes('queen')) castlingNode.value.white.push('queen')
    if (blackCastling.includes('king')) castlingNode.value.black.push('king')
    if (blackCastling.includes('queen')) castlingNode.value.black.push('queen')

    if (
      castlingNode.value.white.length > 0 ||
      castlingNode.value.black.length > 0
    ) {
      ast.children.push(castlingNode)
    }

    if (this.enPassantTarget) {
      ast.children.push({
        kind: 'en-passant-targets',
        value: this.enPassantTarget,
      })
    }

    ast.children.push({
      kind: 'halfmove-clock',
      value: this.halfmoveClock,
    })

    ast.children.push({
      kind: 'fullmove-number',
      value: this.fullmoveNumber,
    })

    return ast
  }

  public fromAFEN(afen: RootNode) {
    this.clear()

    let rank: Rank = 8
    let file: File = 1

    afen.children.forEach((node) => {
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
