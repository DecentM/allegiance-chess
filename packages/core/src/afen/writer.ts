import { allegianceSide } from '../lib/allegiance'
import { PieceAllegiance } from '../chess/board'

import {
  ActiveColourNode,
  CastlingRightsNode,
  EnPassantTargetsNode,
  FullmoveNumberNode,
  HalfmoveClockNode,
  RootNode,
} from './parser'
import { coordinatesToNotation } from '../lib/coordinate'

export type WriteOptions = {
  sections: Array<
    | 'positions'
    | 'active-colour'
    | 'castlig-rights'
    | 'en-passant-targets'
    | 'halfmove-clock'
    | 'fullmove-number'
  >
}

export const defaultOptions: WriteOptions = {
  sections: [
    'positions',
    'active-colour',
    'castlig-rights',
    'en-passant-targets',
    'halfmove-clock',
    'fullmove-number',
  ],
}

export const write = (
  input: RootNode,
  options: WriteOptions = defaultOptions
): string => {
  let positions = ''
  let charsWritten = 0

  input.children.forEach((node) => {
    switch (node.kind) {
      case 'piece': {
        if (charsWritten >= 8) {
          positions += '/'
          charsWritten = 0
        }

        const side = allegianceSide(node.value.allegiance)
        const piece = node.value.piece ?? 'p'

        positions +=
          side === 'white' ? piece.toUpperCase() : piece.toLowerCase()

        if (
          node.value.allegiance === PieceAllegiance.DarkGrey ||
          node.value.allegiance === PieceAllegiance.LightGrey
        ) {
          positions += '>'
        }

        charsWritten++

        break
      }

      case 'skip': {
        if (charsWritten >= 8) {
          positions += '/'
          charsWritten = 0
        }

        positions += node.value

        charsWritten += node.value

        break
      }
    }
  })

  const activeColourNode = input.children.find(
    (node) => node.kind === 'active-colour'
  ) as ActiveColourNode

  let activeColour = ''

  if (activeColourNode) {
    activeColour = activeColourNode.value === 'white' ? 'w' : 'b'
  } else {
    activeColour = 'w'
  }

  const castlingRightsNode = input.children.find(
    (node) => node.kind === 'castling-rights'
  ) as CastlingRightsNode

  let castlingRights = ''

  if (castlingRightsNode) {
    if (castlingRightsNode.value.white.includes('king')) castlingRights += 'K'
    if (castlingRightsNode.value.white.includes('queen')) castlingRights += 'Q'
    if (castlingRightsNode.value.black.includes('king')) castlingRights += 'k'
    if (castlingRightsNode.value.black.includes('queen')) castlingRights += 'q'
  } else {
    castlingRights = '-'
  }

  const enPassantTargetsNode = input.children.find(
    (node) => node.kind === 'en-passant-targets'
  ) as EnPassantTargetsNode

  let enPassantTargets = ''

  if (enPassantTargetsNode) {
    enPassantTargets = coordinatesToNotation(enPassantTargetsNode.value)
  } else {
    enPassantTargets = '-'
  }

  const halfmoveClockNode = input.children.find(
    (node) => node.kind === 'halfmove-clock'
  ) as HalfmoveClockNode

  let halfmoveClock = '0'

  if (halfmoveClockNode) {
    halfmoveClock = String(halfmoveClockNode.value)
  }

  const fullmoveNumberNode = input.children.find(
    (node) => node.kind === 'fullmove-number'
  ) as FullmoveNumberNode

  let fullmoveNumber = '0'

  if (fullmoveNumberNode) {
    fullmoveNumber = String(fullmoveNumberNode.value)
  }

  const result = [
    options.sections.includes('positions') && positions,
    options.sections.includes('active-colour') && activeColour,
    options.sections.includes('castlig-rights') && castlingRights,
    options.sections.includes('en-passant-targets') && enPassantTargets,
    options.sections.includes('halfmove-clock') && halfmoveClock,
    options.sections.includes('fullmove-number') && fullmoveNumber,
  ].join(' ')

  return result
}
