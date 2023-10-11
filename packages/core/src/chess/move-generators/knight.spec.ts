import test from 'ava'

import * as Piece from '../piece'
import { KnightMoveGenerator } from './knight'
import { Board } from '../board'
import { MoveFlag, MoveGeneratorUtilities } from './utils'

class TestKnightMoveGenerator extends KnightMoveGenerator {
  constructor(board: Board) {
    const utils = new MoveGeneratorUtilities(board)

    super(utils)
  }
}

test('generates moves in the center', (t) => {
  const b = new Board({ width: 8, height: 8 })
  const square = Piece.Type.Knight | Piece.Allegiance.Black

  b.setSquare(36, square)

  const g = new TestKnightMoveGenerator(b)
  const moves = g.generateMoves(36, square)

  t.deepEqual(moves, [
    { flags: MoveFlag.None, from: 36, to: 53 },
    { flags: MoveFlag.None, from: 36, to: 46 },
    { flags: MoveFlag.None, from: 36, to: 30 },
    { flags: MoveFlag.None, from: 36, to: 21 },
    { flags: MoveFlag.None, from: 36, to: 19 },
    { flags: MoveFlag.None, from: 36, to: 26 },
    { flags: MoveFlag.None, from: 36, to: 42 },
    { flags: MoveFlag.None, from: 36, to: 51 },
  ])
})

test('generates moves on the left side', (t) => {
  const b = new Board({ width: 8, height: 8 })
  const square = Piece.Type.Knight | Piece.Allegiance.Black

  b.setSquare(32, square)

  const g = new TestKnightMoveGenerator(b)
  const moves = g.generateMoves(32, square)

  t.deepEqual(moves, [
    { flags: MoveFlag.None, from: 32, to: 49 },
    { flags: MoveFlag.None, from: 32, to: 42 },
    { flags: MoveFlag.None, from: 32, to: 26 },
    { flags: MoveFlag.None, from: 32, to: 17 },
  ])
})

test('generates moves on the right side', (t) => {
  const b = new Board({ width: 8, height: 8 })
  const square = Piece.Type.Knight | Piece.Allegiance.Black
  b.setSquare(31, square)

  const g = new TestKnightMoveGenerator(b)
  const moves = g.generateMoves(31, square)

  t.deepEqual(moves, [
    { flags: MoveFlag.None, from: 31, to: 14 },
    { flags: MoveFlag.None, from: 31, to: 21 },
    { flags: MoveFlag.None, from: 31, to: 37 },
    { flags: MoveFlag.None, from: 31, to: 46 },
  ])
})

test('generates moves on the bottom', (t) => {
  const b = new Board({ width: 8, height: 8 })
  const square = Piece.Type.Knight | Piece.Allegiance.Black
  b.setSquare(4, square)

  const g = new TestKnightMoveGenerator(b)
  const moves = g.generateMoves(4, square)

  t.deepEqual(moves, [
    { flags: MoveFlag.None, from: 4, to: 21 },
    { flags: MoveFlag.None, from: 4, to: 14 },
    { flags: MoveFlag.None, from: 4, to: 10 },
    { flags: MoveFlag.None, from: 4, to: 19 },
  ])
})

test('generates moves on the top', (t) => {
  const b = new Board({ width: 8, height: 8 })
  const square = Piece.Type.Knight | Piece.Allegiance.Black
  b.setSquare(60, square)

  const g = new TestKnightMoveGenerator(b)
  const moves = g.generateMoves(60, square)

  t.deepEqual(moves, [
    { flags: MoveFlag.None, from: 60, to: 54 },
    { flags: MoveFlag.None, from: 60, to: 45 },
    { flags: MoveFlag.None, from: 60, to: 43 },
    { flags: MoveFlag.None, from: 60, to: 50 },
  ])
})

test('generates moves in a corner', (t) => {
  const b = new Board({ width: 8, height: 8 })
  const square = Piece.Type.Knight | Piece.Allegiance.Black
  b.setSquare(63, square)

  const g = new TestKnightMoveGenerator(b)
  const moves = g.generateMoves(63, square)

  t.deepEqual(moves, [
    { flags: MoveFlag.None, from: 63, to: 46 },
    { flags: MoveFlag.None, from: 63, to: 53 },
  ])
})

test('generates moves that capture opposing pieces but not own ones', (t) => {
  const b = new Board({ width: 8, height: 8 })

  b.setSquare(63, Piece.Type.Knight | Piece.Allegiance.Black)
  b.setSquare(46, Piece.Type.Pawn | Piece.Allegiance.DarkGrey)
  b.setSquare(53, Piece.Type.Pawn | Piece.Allegiance.LightGrey)

  const g = new TestKnightMoveGenerator(b)
  const moves = g.generateMoves(63, Piece.Type.Knight | Piece.Allegiance.Black)

  t.deepEqual(moves, [{ flags: MoveFlag.IsCapture, from: 63, to: 53 }])
})
