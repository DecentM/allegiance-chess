import test from 'ava'

import { Vector2 } from '../lib/vector2'
import { tokenize } from '../notation/tokenizer'
import { parse } from '../notation/parser'

import { Board, PROMOTION_PIECES, PieceAllegiance } from './board'
import { coordinatesEqual } from '../lib/coordinate'

const createDefaultBoard = () => {
  const b = new Board()

  b.importAFEN('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 0')

  return b
}

test('board', (t) => {
  const b = new Board()

  b.traceCaptureSteps(
    {
      file: 1,
      rank: 2,
    },
    new Vector2(0, 10)
  )

  t.pass()
})

test('finds 20 moves on a starting board for white', (t) => {
  const b = createDefaultBoard()

  const moves = b.getValidMoves()

  t.is(moves.length, 20)
})

test('finds 20 moves for black after a move', (t) => {
  const b = createDefaultBoard()

  b.executeNode({
    kind: 'move',
    to: {
      rank: 4,
      file: 2,
    },
  })

  const moves = b.getValidMoves()

  t.is(moves.length, 20)
})

test('executes single move', (t) => {
  const b = createDefaultBoard()

  b.executeNodes([
    {
      kind: 'move',
      type: null,
      from: {
        file: 1,
        rank: 2,
      },
      to: {
        file: 1,
        rank: 3,
      },
      piece: null,
    },
  ])

  t.log(b.dump())

  t.pass()
})

test('traces steps forward', (t) => {
  const b = createDefaultBoard()

  const steps = b.traceCaptureSteps(
    {
      file: 1,
      rank: 2,
    },
    new Vector2(0, 10)
  )

  t.deepEqual(steps, [
    { file: 1, rank: 3 },
    { file: 1, rank: 4 },
    { file: 1, rank: 5 },
    { file: 1, rank: 6 },
    { file: 1, rank: 7 },
  ])
})

test('clones empty', (t) => {
  const b = new Board()
  const b1 = b.clone()

  t.is(b.dump(), b1.dump())
})

test('clones with state', (t) => {
  const b = createDefaultBoard()
  const b1 = b.clone()

  t.is(b.dump(), b1.dump())
})

test('traces capture for a bishop', (t) => {
  const b = new Board()

  b.importAFEN('8/8/8/3b4/8/8/8/8')

  const captureSteps = b.traceCaptureSteps(
    {
      rank: 5,
      file: 4,
    },
    new Vector2(-1, 1)
  )

  t.deepEqual(captureSteps, [
    { file: 3, rank: 6 },
    { file: 2, rank: 7 },
    { file: 1, rank: 8 },
  ])
})

test('executes moves', (t) => {
  const b = createDefaultBoard()
  const moveTokens = tokenize(
    `
      1.e4 e5
      2.Nf3 Nc6
      3.d4 exd4
      4.Bc4 Bb4+
      5.c3 dxc3
      6.O-O cxb2
      7.Bxb2 Bf8
      8.e5 d6
      9.Re1 dxe5
      10.Nxe5 Qxd1
      11.Bxf7+ Ke7
      12.Ng6+ Kxf7
      13.Nxh8# 1-0
    `
  )

  const moveNodes = parse(moveTokens)

  b.executeNodes(moveNodes.children)

  t.log(b.dump())
  t.snapshot(b.dump())
})

test('infers single node', (t) => {
  const b = createDefaultBoard()

  const node = b.inferNode({
    kind: 'move',
    type: null,
    to: {
      file: 1,
      rank: 4,
    },
  })

  t.deepEqual(node, {
    from: {
      allegiance: 3,
      file: 1,
      piece: null,
      rank: 2,
    },
    kind: 'move',
    piece: null,
    to: {
      file: 1,
      rank: 4,
    },
    type: null,
  })
})

test('infers two nodes', (t) => {
  const b = createDefaultBoard()

  const node1 = b.inferNode({
    kind: 'move',
    to: {
      file: 5,
      rank: 4,
    },
  })

  b.executeNode(node1)

  const node2 = b.inferNode({
    kind: 'move',
    to: {
      file: 5,
      rank: 5,
    },
  })

  b.executeNode(node2)

  t.log(b.dump())
  t.snapshot(b.dump())
})

test('finds promotion move', (t) => {
  const b = new Board()

  b.importAFEN('8/3P4/8/8/8/8/8/8')

  const moves = b.getValidMoves()

  t.deepEqual(
    moves,
    PROMOTION_PIECES.map((piece) => ({
      kind: 'move',
      type: 'promotion',
      piece: null,
      from: {
        allegiance: PieceAllegiance.White,
        piece: null,
        file: 4,
        rank: 7,
      },
      to: {
        file: 4,
        rank: 8,
      },
      promotionTo: piece,
    }))
  )
})

test('finds kingside castling', (t) => {
  const b = new Board()

  b.importAFEN('4k2r/8/8/8/8/8/8/4K3 b k - 0 0')

  const validMoves = b.getValidMoves()

  const kingMoves = validMoves.filter((move) => {
    return move.kind === 'move' && move.piece === 'K'
  })

  const castleMoves = kingMoves.filter((move) => {
    return (
      move.kind === 'move' &&
      move.type === 'castle' &&
      move.side === 'king' &&
      coordinatesEqual(move.from, {
        file: 5,
        rank: 8,
      }) &&
      coordinatesEqual(move.to, {
        file: 7,
        rank: 8,
      })
    )
  })

  t.is(castleMoves.length, 1)
})

test('makes a move with castling available', (t) => {
  const b = new Board()

  b.importAFEN(
    'rnbqkb>n>r>/pppp3p>/5p2/4p1p1/6P1/5N>1B>/PPPPPP1P>/RNBQK2R> b kqKQ e6 3 6'
  )

  t.notThrows(() => {
    b.executeNode({
      kind: 'move',
      from: {
        file: 4,
        rank: 7,
      },
      to: {
        file: 4,
        rank: 5,
      },
    })
  })
})

test('does not castle onto a knight while checking for valid moves', (t) => {
  const b = new Board()

  b.importAFEN(
    'r3kb>n>r>/pppbq2p>/2n2p2/1P1pp1p1/6P1/2PP1N>1B>/P3PP1P>/RNBQK2R> b kqKQ - 7 14'
  )

  t.notThrows(() => {
    b.getValidMoves()
  })
})

test('forces capture if allegiance change is not enough', (t) => {
  const b = new Board()

  b.importAFEN(
    'rnb1kbnr/pppp1ppp/8/4p3/3P3P>/6P1/PPPqPP2/RNB1KBNR w kqKQ - 7 14'
  )

  const result = b.getValidMoves()

  t.assert(
    result.every(
      (move) =>
        move.kind === 'move' &&
        move.type === 'capture' &&
        coordinatesEqual(move.to, { file: 4, rank: 2 })
    )
  )
})

test('finds possible allegiance moves', (t) => {
  const b = new Board()

  b.importAFEN('8/8/8/4p3/8/5N2/8/8 w kqKQ e6 1 2')

  const result = b.getValidMoves()

  t.assert(
    result.some((move) => {
      return (
        move.kind === 'move' &&
        move.type === 'allegiance' &&
        coordinatesEqual(move.from, { file: 6, rank: 3 }) &&
        coordinatesEqual(move.to, { file: 5, rank: 5 })
      )
    })
  )
})

test('executes possible allegiance move', (t) => {
  const b = new Board()

  b.importAFEN('8/8/8/4p3/8/5N2/8/8 w kqKQ e6 1 2')

  t.notThrows(() => {
    b.executeNode({
      kind: 'move',
      type: 'allegiance',
      from: {
        file: 6,
        rank: 3,
      },
      to: {
        file: 5,
        rank: 5,
      },
    })
  })
})
