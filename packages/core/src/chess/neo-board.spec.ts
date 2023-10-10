import test from 'ava'

import * as Piece from './piece'
import { Colour, NeoBoard } from './neo-board'
import { MoveFlag } from './move-generators/utils'

test('sets squares', (t) => {
  const b = new NeoBoard({ height: 8, width: 8 })

  b.setSquare(0, NeoBoard.square(Piece.Type.Queen | Piece.Allegiance.White))
  b.setSquare(9, NeoBoard.square(Piece.Type.Queen | Piece.Allegiance.Black))

  t.is(b.getSquare(0), Piece.Type.Queen | Piece.Allegiance.White)
})

test('determines colour', (t) => {
  t.is(NeoBoard.getColour(Piece.Allegiance.Black), Colour.Black)
  t.is(NeoBoard.getColour(Piece.Allegiance.DarkGrey), Colour.Black)
  t.is(NeoBoard.getColour(Piece.Allegiance.LightGrey), Colour.White)
  t.is(NeoBoard.getColour(Piece.Allegiance.White), Colour.White)
})

test('generates moves', (t) => {
  const b = new NeoBoard({ height: 8, width: 8 })

  b.setSquare(0, NeoBoard.square(Piece.Type.Queen | Piece.Allegiance.White))
  b.setSquare(9, NeoBoard.square(Piece.Type.Queen | Piece.Allegiance.Black))

  const moves = b.moveGenerator.generateMoves(0)

  t.deepEqual(moves, [
    { flags: MoveFlag.None, from: 0, to: 8 },
    { flags: MoveFlag.None, from: 0, to: 16 },
    { flags: MoveFlag.None, from: 0, to: 24 },
    { flags: MoveFlag.None, from: 0, to: 32 },
    { flags: MoveFlag.None, from: 0, to: 40 },
    { flags: MoveFlag.None, from: 0, to: 48 },
    { flags: MoveFlag.None, from: 0, to: 56 },
    { flags: MoveFlag.IsCapture, from: 0, to: 9 },
    { flags: MoveFlag.None, from: 0, to: 1 },
    { flags: MoveFlag.None, from: 0, to: 2 },
    { flags: MoveFlag.None, from: 0, to: 3 },
    { flags: MoveFlag.None, from: 0, to: 4 },
    { flags: MoveFlag.None, from: 0, to: 5 },
    { flags: MoveFlag.None, from: 0, to: 6 },
    { flags: MoveFlag.None, from: 0, to: 7 },
  ])
})
