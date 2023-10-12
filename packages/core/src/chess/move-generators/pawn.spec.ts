import test from 'ava'

import * as Piece from '../piece'
import { Board } from '../board'
import { MoveFlag, MoveGeneratorUtilities } from './utils'
import { PawnMoveGenerator } from './pawn'

test('generates step forward', (t) => {
  const b = new Board({ width: 8, height: 8 })
  const blackPawn = Piece.Type.Pawn | Piece.Allegiance.Black
  const whitePawn = Piece.Type.Pawn | Piece.Allegiance.LightGrey

  b.setSquare(20, blackPawn)
  b.setSquare(21, whitePawn)

  const utils = new MoveGeneratorUtilities(b)
  const g = new PawnMoveGenerator(utils)
  const blackPawnMoves = g.generateMoves(20, blackPawn)

  t.deepEqual(blackPawnMoves, [
    {
      flags: MoveFlag.None,
      from: 20,
      promotion: null,
      to: 12,
      undo: null,
    },
  ])

  const whitePawnMoves = g.generateMoves(21, whitePawn)

  t.deepEqual(whitePawnMoves, [
    {
      flags: MoveFlag.None,
      from: 21,
      promotion: null,
      to: 29,
      undo: null,
    },
  ])
})

test('generates capture', (t) => {
  const b = new Board({ width: 8, height: 8 })
  const blackPawn = Piece.Type.Pawn | Piece.Allegiance.Black
  const whitePawn = Piece.Type.Pawn | Piece.Allegiance.LightGrey

  const utils = new MoveGeneratorUtilities(b)
  const g = new PawnMoveGenerator(utils)

  b.setSquare(12, whitePawn)
  b.setSquare(21, blackPawn)

  const whitePawnMoves = g.generateMoves(12, whitePawn)

  t.deepEqual(whitePawnMoves, [
    {
      flags: MoveFlag.None,
      from: 12,
      promotion: null,
      to: 20,
      undo: null,
    },
    {
      flags: MoveFlag.None,
      from: 12,
      promotion: null,
      to: 28,
      undo: null,
    },
    {
      flags: MoveFlag.IsCapture,
      from: 12,
      promotion: null,
      to: 21,
      undo: {
        captures: {
          index: 21,
          square: blackPawn,
        },
      },
    },
  ])
})

test('generates promotion', (t) => {
  const b = new Board({ width: 8, height: 8 })
  const pawn = Piece.Type.Pawn | Piece.Allegiance.White

  const utils = new MoveGeneratorUtilities(b)
  const g = new PawnMoveGenerator(utils)

  b.setSquare(52, pawn)

  const moves = g.generateMoves(52, pawn)

  t.deepEqual(moves, [
    { flags: MoveFlag.IsPromotion, from: 52, promotion: 3, to: 60, undo: null },
    { flags: MoveFlag.IsPromotion, from: 52, promotion: 4, to: 60, undo: null },
    { flags: MoveFlag.IsPromotion, from: 52, promotion: 5, to: 60, undo: null },
    { flags: MoveFlag.IsPromotion, from: 52, promotion: 6, to: 60, undo: null },
  ])
})
