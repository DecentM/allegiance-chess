import test from 'ava'

import * as Piece from '../piece'
import { QueenMoveGenerator } from './queen'
import { Board } from '../board'
import { MoveGeneratorUtilities } from './utils'

test('generates moves', (t) => {
  const b = new Board({ width: 8, height: 8 })
  const square = Piece.Type.Queen | Piece.Allegiance.Black

  b.setSquare(20, square)

  const utils = new MoveGeneratorUtilities(b)
  const g = new QueenMoveGenerator(utils)
  const moves = g.generateMoves(20, square)

  t.is(moves.length, 25)
})
