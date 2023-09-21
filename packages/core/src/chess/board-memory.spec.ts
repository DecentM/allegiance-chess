import test from 'ava'
import { BoardMemory } from './board-memory'

/**
 * Cases 1-3 from:
 * https://www.chess.com/terms/fen-chess
 */

test('case 1', (t) => {
  const memory = new BoardMemory()

  memory.importAFEN('4k2r/6r1/8/8/8/8/3R4/R3K3 w Qk - 0 1')

  t.snapshot(memory.dump())
})

test('case 2', (t) => {
  const memory = new BoardMemory()

  memory.importAFEN(
    'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1'
  )

  t.snapshot(memory.dump())
})

test('case 3', (t) => {
  const memory = new BoardMemory()

  memory.importAFEN('8/5k2/3p4/1p1Pp2p/pP2Pp1P/P4P1K/8/8 b - - 99 50')

  t.snapshot(memory.dump())
})

test('case 4', (t) => {
  const memory = new BoardMemory()

  memory.importAFEN(
    'rnbqkbnr/pppppp>p>p/8/8/4P>3/8/PPPP>1PPP/RNBQKBNR b KQkq e3 0 1'
  )

  t.snapshot(memory.dump())
})

test('clones with state', (t) => {
  const m = new BoardMemory()

  m.importAFEN('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR')

  const m1 = m.clone()

  t.is(m.dump(), m1.dump())
})
