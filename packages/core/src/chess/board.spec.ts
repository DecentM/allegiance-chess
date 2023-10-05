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

  const move = Board.findMoveIndex(b.getValidMoves(), {
    kind: 'move',
    to: {
      rank: 4,
      file: 2,
    },
  })

  b.executeMoveIndex(move)

  const moves = b.getValidMoves()

  t.is(moves.length, 20)
})

test('executes single move', (t) => {
  const b = createDefaultBoard()

  const move = Board.findMoveIndex(b.getValidMoves(), {
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
  })

  b.executeMoveIndex(move)

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

  moveNodes.children.forEach((node) => {
    const index = Board.findMoveIndex(b.getValidMoves(), node)

    b.executeMoveIndex(index)
  })

  t.log(b.dump())
  t.snapshot(b.dump())
})

test('finds single node', (t) => {
  const b = createDefaultBoard()

  const node = Board.findMoveIndex(b.getValidMoves(), {
    kind: 'move',
    type: null,
    to: {
      file: 1,
      rank: 4,
    },
  })

  t.not(node, -1)
})

test('infers two nodes', (t) => {
  const b = createDefaultBoard()

  const node1 = Board.findMoveIndex(b.getValidMoves(), {
    kind: 'move',
    to: {
      file: 5,
      rank: 4,
    },
  })

  b.executeMoveIndex(node1)

  const node2 = Board.findMoveIndex(b.getValidMoves(), {
    kind: 'move',
    to: {
      file: 5,
      rank: 5,
    },
  })

  b.executeMoveIndex(node2)

  t.log(b.dump())
  t.snapshot(b.dump())
})

test('finds promotion move', (t) => {
  const b = new Board()

  b.importAFEN('8/3P4/8/8/8/8/8/8')

  const moves = b.getValidMoves()

  t.deepEqual(
    moves.filter((move) => move.kind === 'move'),
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

  t.not(
    Board.findMoveIndex(b.getValidMoves(), {
      kind: 'move',
      from: {
        file: 4,
        rank: 7,
      },
      to: {
        file: 4,
        rank: 5,
      },
    }),
    -1
  )
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
    result
      .filter((move) => move.kind === 'move')
      .every(
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

  t.not(
    Board.findMoveIndex(b.getValidMoves(), {
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
    }),
    -1
  )
})

test('challenging is allowed even if the piece is pinned', (t) => {
  const b = new Board()

  b.importAFEN('4k3/8/2n5/1B6/3P>4/8/8/8 b kqKQ - 6 13')

  const result = b.getValidMoves()

  const canChallenge = result.some((move) => {
    return (
      move.kind === 'move' &&
      coordinatesEqual(move.from, { file: 3, rank: 6 }) &&
      coordinatesEqual(move.to, { file: 4, rank: 4 }) &&
      move.type === 'allegiance'
    )
  })

  const canCapture = result.some((move) => {
    return (
      move.kind === 'move' &&
      coordinatesEqual(move.from, { file: 3, rank: 6 }) &&
      coordinatesEqual(move.to, { file: 4, rank: 4 }) &&
      move.type === 'capture'
    )
  })

  t.true(canChallenge)
  t.false(canCapture)
})

test('does not allow castling without rooks', (t) => {
  const b = new Board()

  b.importAFEN('4k3/8/2n5/1B6/3P>4/8/8/8 b kqKQ - 6 13')

  const result = b.getValidMoves()

  const canCastleKingSide = result.some((move) => {
    return (
      move.kind === 'move' && move.type === 'castle' && move.side === 'king'
    )
  })

  const canCastleQueenSide = result.some((move) => {
    return (
      move.kind === 'move' && move.type === 'castle' && move.side === 'queen'
    )
  })

  t.false(canCastleKingSide)
  t.false(canCastleQueenSide)
})

test('does not allow castling through checks', (t) => {
  const b = new Board()

  b.importAFEN('8/8/b7/8/8/8/8/4K2R w KQkq 1 1')

  const validMoves = b.getValidMoves()

  t.is(
    validMoves.find((move) => move.kind === 'move' && move.type === 'castle'),
    undefined
  )
})

test('allows Bh6 from rnbk3r/p3n>Q2/1pp>p4/q3p1Bp/3P4/PB3N2/1P3RPP/RN4K1 w - h6 0 30', (t) => {
  const b = new Board()

  b.importAFEN('rnbk3r/p3n>Q2/1pp>p4/q3p1Bp/3P4/PB3N2/1P3RPP/RN4K1 w - h6 0 30')

  const index = Board.findMoveIndex(b.getValidMoves(), {
    kind: 'move',
    type: null,
    from: {
      file: 7,
      rank: 5,
    },
    to: {
      file: 8,
      rank: 6,
    },
  })

  t.not(index, -1)

  b.executeMoveIndex(index)

  const result = b.getSquare({
    file: 8,
    rank: 6,
  })

  t.deepEqual(result, {
    piece: 'B',
    allegiance: 3,
  })
})

test('detects checkmate by white', (t) => {
  const b = new Board()

  b.importAFEN('rnbk3r/p4Q2/1pp>p4/q3p1Bp/P2P4/1Bn>2N2/1P3RPP/RN4K1 b - - 2 32')

  const result = b.getValidMoves()

  t.deepEqual(result, [
    {
      kind: 'game-over',
      outcome: 'white',
      reason: 'Checkmate',
    },
  ])
})

test('detects stalemate by black', (t) => {
  const b = new Board()

  b.importAFEN('8/8/4k3/8/8/6q1/8/7K w - - 0 1')

  const result = b.getValidMoves()

  t.deepEqual(result, [
    {
      kind: 'game-over',
      outcome: 'draw',
      reason: 'Stalemate',
    },
  ])
})

test('executes castling on 1N>3k2/8/8/1N2N2Q/p7/P3B3/4BPPP/4K2R w K - 0 32', (t) => {
  const b = new Board()

  b.importAFEN('1N>3k2/8/8/1N2N2Q/p7/P3B3/4BPPP/4K2R w K - 0 32')
  b.importMoveHistory(`
    1. Ng1f3 a7a5
    2. Nb1c3 c7c5
    3. d2d4 Qd8b6
    4. Bc1e3 Qb6b5
    5. d4xc5 Qb5xe2
    6. Qd1xe2 Ra8a6
    7. Qe2>a6 e7e6
    8. Qe2>a6 Nb8xa6
    9. Qe2>a6 b7b5
    10. Nc3>b5 b5b4
    11. Nc3b5 Bf8>c5
    12. c2c3 b4>c3
    13. c3xb4 Na6xb4
    14. a2a3 Ke8e7
    15. a3>b4 Bc8a6
    16. Nb4xa6 Ng8h6
    17. Ra1d1 Ke7e8
    18. Nf3e5 Bf8xc5
    19. Rd1xd7 Bc5f8
    20. Na6b8 Nh6g4
    21. Qe2xg4 f7f5
    22. Qg4g5 Bf8xa3
    23. b2xa3 g7g6
    24. Ne5c6 Ke8>d7
    25. Rd7c7 h7h5
    26. Rc7c8 Ke8f7
    27. Rc8xh8 e6e5
    28. Nc6xe5 Kf7g7
    29. Qg5xg6 Kg7xh8
    30. Qg6xf5 Kh8g7
    31. Qf5xh5 Kg7f8
    32. Bf1e2 a5a4
  `)

  const moves = b.getValidMoves({ file: 5, rank: 1 })
  const castleMove = moves.find(
    (move) => move.kind === 'move' && move.type === 'castle'
  )

  const index = b.findMoveIndex(castleMove)

  t.notThrows(() => b.executeMoveIndex(index))
})

test('promoting does not cause a check', (t) => {
  const b = new Board(
    'rnbqkbnr/p3P>ppp/8/1p6/8/8/PPPPPPPP/R1BQKBNR b KQkq - 0 4'
  )

  const checkMoves = b.getCheckMoves()

  t.deepEqual(checkMoves, [])
})
