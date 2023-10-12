import test from 'ava'

import * as Piece from './piece'
import { Colour, Board } from './board'
import { MoveFlag } from './move-generators/utils'

test('sets squares', (t) => {
  const b = new Board({ height: 8, width: 8 })

  b.setSquare(0, Board.square(Piece.Type.Queen | Piece.Allegiance.White))
  b.setSquare(9, Board.square(Piece.Type.Queen | Piece.Allegiance.Black))

  t.is(b.getSquare(0), Piece.Type.Queen | Piece.Allegiance.White)
})

test('determines colour', (t) => {
  t.is(Board.getColour(Piece.Allegiance.Black), Colour.Black)
  t.is(Board.getColour(Piece.Allegiance.DarkGrey), Colour.Black)
  t.is(Board.getColour(Piece.Allegiance.LightGrey), Colour.White)
  t.is(Board.getColour(Piece.Allegiance.White), Colour.White)
})

test('generates moves', (t) => {
  const b = new Board({ height: 8, width: 8 })

  b.setSquare(0, Board.square(Piece.Type.Queen | Piece.Allegiance.White))
  b.setSquare(9, Board.square(Piece.Type.Queen | Piece.Allegiance.Black))

  const moves = b.moveGenerator.generateMoves(0)

  t.deepEqual(moves, [
    { flags: MoveFlag.None, from: 0, to: 8, undo: null, promotion: null },
    { flags: MoveFlag.None, from: 0, to: 16, undo: null, promotion: null },
    { flags: MoveFlag.None, from: 0, to: 24, undo: null, promotion: null },
    { flags: MoveFlag.None, from: 0, to: 32, undo: null, promotion: null },
    { flags: MoveFlag.None, from: 0, to: 40, undo: null, promotion: null },
    { flags: MoveFlag.None, from: 0, to: 48, undo: null, promotion: null },
    { flags: MoveFlag.None, from: 0, to: 56, undo: null, promotion: null },
    {
      flags: MoveFlag.IsCapture,
      from: 0,
      to: 9,
      undo: {
        captures: {
          index: 9,
          square: Piece.Type.Queen | Piece.Allegiance.Black,
        },
      },
      promotion: null,
    },
    { flags: MoveFlag.None, from: 0, to: 1, undo: null, promotion: null },
    { flags: MoveFlag.None, from: 0, to: 2, undo: null, promotion: null },
    { flags: MoveFlag.None, from: 0, to: 3, undo: null, promotion: null },
    { flags: MoveFlag.None, from: 0, to: 4, undo: null, promotion: null },
    { flags: MoveFlag.None, from: 0, to: 5, undo: null, promotion: null },
    { flags: MoveFlag.None, from: 0, to: 6, undo: null, promotion: null },
    { flags: MoveFlag.None, from: 0, to: 7, undo: null, promotion: null },
  ])
})
