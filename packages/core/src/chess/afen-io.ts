import { NeoBoard } from './neo-board'
import * as Afen from '../afen'

export class AfenIO {
  constructor(private board: NeoBoard) {}

  public export(
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
        value: this.board.activeColour,
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
      this.board.enPassantTarget !== -1
    ) {
      ast.children.push({
        kind: 'en-passant-targets',
        value: this.board.enPassantTarget,
      })
    }

    if (options.sections.includes('halfmove-clock')) {
      ast.children.push({
        kind: 'halfmove-clock',
        value: this.board.halfmoveClock,
      })
    }

    if (options.sections.includes('fullmove-number')) {
      ast.children.push({
        kind: 'fullmove-number',
        value: this.board.fullmoveNumber,
      })
    }

    return ast
  }

  public import(afen: Afen.RootNode) {
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