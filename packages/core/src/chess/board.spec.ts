import test from 'ava'

import { Board } from './board'
import { Vector2 } from '../lib/vector2'
import { tokenize } from '../notation/tokenizer'
import { parse } from '../notation/parser'

const createDefaultBoard = () => {
  const b = new Board()

  b.importAFEN('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR')

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
