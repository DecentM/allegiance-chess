import test from 'ava'

import * as Piece from '../piece'
import { KnightMoveGenerator } from './knight'
import { NeoBoard } from '../neo-board'

test('generates moves in the center', (t) => {
  const b = new NeoBoard({ width: 8, height: 8 })

  b.setSquare(36, Piece.Type.Knight | Piece.Allegiance.Black)

  const g = new KnightMoveGenerator(b)
  const moves = g.generateMoves(36)

  t.deepEqual(moves, [
    { from: 36, to: 53 },
    { from: 36, to: 46 },
    { from: 36, to: 30 },
    { from: 36, to: 21 },
    { from: 36, to: 19 },
    { from: 36, to: 26 },
    { from: 36, to: 42 },
    { from: 36, to: 51 },
  ])
})

test('generates moves on the left side', (t) => {
  const b = new NeoBoard({ width: 8, height: 8 })

  b.setSquare(32, Piece.Type.Knight | Piece.Allegiance.Black)

  const g = new KnightMoveGenerator(b)
  const moves = g.generateMoves(32)

  t.deepEqual(moves, [
    { from: 32, to: 49 },
    { from: 32, to: 42 },
    { from: 32, to: 26 },
    { from: 32, to: 17 },
  ])
})

test('generates moves on the right side', (t) => {
  const b = new NeoBoard({ width: 8, height: 8 })

  b.setSquare(31, Piece.Type.Knight | Piece.Allegiance.Black)

  const g = new KnightMoveGenerator(b)
  const moves = g.generateMoves(31)

  t.deepEqual(moves, [
    { from: 31, to: 14 },
    { from: 31, to: 21 },
    { from: 31, to: 37 },
    { from: 31, to: 46 },
  ])
})

test('generates moves on the bottom', (t) => {
  const b = new NeoBoard({ width: 8, height: 8 })

  b.setSquare(4, Piece.Type.Knight | Piece.Allegiance.Black)

  const g = new KnightMoveGenerator(b)
  const moves = g.generateMoves(4)

  t.deepEqual(moves, [
    { from: 4, to: 21 },
    { from: 4, to: 14 },
    { from: 4, to: 10 },
    { from: 4, to: 19 },
  ])
})

test('generates moves on the top', (t) => {
  const b = new NeoBoard({ width: 8, height: 8 })

  b.setSquare(60, Piece.Type.Knight | Piece.Allegiance.Black)

  const g = new KnightMoveGenerator(b)
  const moves = g.generateMoves(60)

  t.deepEqual(moves, [
    { from: 60, to: 54 },
    { from: 60, to: 45 },
    { from: 60, to: 43 },
    { from: 60, to: 50 },
  ])
})

test('generates moves in a corner', (t) => {
  const b = new NeoBoard({ width: 8, height: 8 })

  b.setSquare(63, Piece.Type.Knight | Piece.Allegiance.Black)

  const g = new KnightMoveGenerator(b)
  const moves = g.generateMoves(63)

  t.deepEqual(moves, [
    { from: 63, to: 46 },
    { from: 63, to: 53 },
  ])
})

test('generates moves that capture opposing pieces but not own ones', (t) => {
  const b = new NeoBoard({ width: 8, height: 8 })

  b.setSquare(63, Piece.Type.Knight | Piece.Allegiance.Black)
  b.setSquare(46, Piece.Type.Pawn | Piece.Allegiance.DarkGrey)
  b.setSquare(53, Piece.Type.Pawn | Piece.Allegiance.LightGrey)

  const g = new KnightMoveGenerator(b)
  const moves = g.generateMoves(63)

  t.deepEqual(moves, [{ from: 63, to: 53 }])
})
