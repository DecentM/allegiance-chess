import test from 'ava'

import * as Piece from '../piece'
import { QueenMoveGenerator } from './queen'
import { NeoBoard } from '../neo-board'

test('generates moves', (t) => {
  const b = new NeoBoard({ width: 8, height: 8 })

  b.setSquare(20, Piece.Type.Queen | Piece.Allegiance.Black)

  const g = new QueenMoveGenerator(b)
  const moves = g.generateMoves(20)

  t.is(moves.length, 25)
})
