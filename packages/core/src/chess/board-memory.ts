import { VError } from 'verror'

import * as Notation from '../notation'
import * as Afen from '../afen'

import { fileToLetter } from '../lib/notation'
import { allegianceSide } from '../lib/allegiance'

import { PieceAllegiance } from './board'
import { getCoordsForIndex, getIndexForCoords } from '../lib/board'

export type BoardSquare = {
  piece: Notation.Piece | null
  allegiance: PieceAllegiance
}

// memory[rank][file] = BoardSquare
type Memory = (BoardSquare | null)[]

type StandaloneBoardSquare = BoardSquare & Notation.Coordinates

export class BoardMemory {
  private memory: Memory = []

  public activeColour: 'black' | 'white'

  public enPassantTarget: Notation.Coordinates | null

  private _castlingRights: Array<{
    colour: 'white' | 'black'
    side: 'queen' | 'king'
  }>

  public halfmoveClock: number

  public fullmoveNumber: number

  public moveHistory: Notation.RootNode

  public clone() {
    const memory = new BoardMemory()

    memory.memory = [...this.memory]
    memory.activeColour = this.activeColour
    memory.enPassantTarget = this.enPassantTarget
      ? { ...this.enPassantTarget }
      : null
    memory._castlingRights = [...this._castlingRights]
    memory.halfmoveClock = this.halfmoveClock
    memory.fullmoveNumber = this.fullmoveNumber

    memory.moveHistory = {
      kind: 'root',
      children: [...this.moveHistory.children],
    }

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

  public clear() {
    this.activeColour = 'white'
    this.enPassantTarget = null
    this._castlingRights = []
    this.halfmoveClock = 0
    this.fullmoveNumber = 0

    this.moveHistory = {
      kind: 'root',
      children: [],
    }

    this.memory = Array.from({ length: 64 }).fill(null) as null[]
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
      .map((_, fileIndex) => fileToLetter((fileIndex + 1) as Notation.File))
      .join(' ')}`

    return result
  }

  public getSquares(): StandaloneBoardSquare[] {
    return this.memory.map((item, index) => {
      if (!item) {
        return null
      }

      return {
        ...item,
        ...getCoordsForIndex(index),
      }
    })
  }

  public getSquare(coords: Notation.Coordinates) {
    if (!coords) {
      throw new VError('Attempted to get square with no coordinates')
    }

    return this.memory[getIndexForCoords(coords)]
  }

  public setSquare(coords: Notation.Coordinates, square: BoardSquare | null) {
    this.memory[getIndexForCoords(coords)] = square
  }

  public toAFEN(
    options: Afen.WriteOptions = Afen.defaultOptions
  ): Afen.RootNode {
    const ast: Afen.RootNode = {
      kind: 'ast',
      children: [],
    }

    let skip = 0

    if (options.sections.includes('positions')) {
      for (let i = 0; i < this.memory.length; i++) {
        if (!this.memory[i]) {
          skip++
        } else {
          if (skip) {
            ast.children.push({ kind: 'skip', value: skip })
            skip = 0
          }

          ast.children.push({ kind: 'piece', value: this.memory[i] })
        }

        if ((i + 1) % 8 === 0 && skip) {
          ast.children.push({ kind: 'skip', value: skip })
          skip = 0
        }
      }

      if (skip) {
        ast.children.push({ kind: 'skip', value: skip })
      }
    }

    if (options.sections.includes('active-colour')) {
      ast.children.push({
        kind: 'active-colour',
        value: this.activeColour,
      })
    }

    if (options.sections.includes('castlig-rights')) {
      const castlingNode: Afen.CastlingRightsNode = {
        kind: 'castling-rights',
        value: { black: [], white: [] },
      }

      const whiteCastling = this.castlingRights('white')
      const blackCastling = this.castlingRights('black')

      if (whiteCastling.includes('king')) castlingNode.value.white.push('king')
      if (whiteCastling.includes('queen'))
        castlingNode.value.white.push('queen')
      if (blackCastling.includes('king')) castlingNode.value.black.push('king')
      if (blackCastling.includes('queen'))
        castlingNode.value.black.push('queen')

      if (
        castlingNode.value.white.length > 0 ||
        castlingNode.value.black.length > 0
      ) {
        ast.children.push(castlingNode)
      }
    }

    if (
      options.sections.includes('en-passant-targets') &&
      this.enPassantTarget
    ) {
      ast.children.push({
        kind: 'en-passant-targets',
        value: this.enPassantTarget,
      })
    }

    if (options.sections.includes('halfmove-clock')) {
      ast.children.push({
        kind: 'halfmove-clock',
        value: this.halfmoveClock,
      })
    }

    if (options.sections.includes('fullmove-number')) {
      ast.children.push({
        kind: 'fullmove-number',
        value: this.fullmoveNumber,
      })
    }

    return ast
  }

  public fromAFEN(afen: Afen.RootNode) {
    this.clear()

    let index = 0

    for (const node of afen.children) {
      if (node.kind === 'skip') {
        index += node.value
        continue
      }

      if (node.kind === 'piece') {
        this.memory[index] = node.value
        index++
        continue
      }

      if (node.kind === 'en-passant-targets') {
        this.enPassantTarget = node.value
        continue
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

        continue
      }

      if (node.kind === 'active-colour') {
        this.activeColour = node.value
        continue
      }

      if (node.kind === 'fullmove-number') {
        this.fullmoveNumber = node.value
        continue
      }

      if (node.kind === 'halfmove-clock') {
        this.halfmoveClock = node.value
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
