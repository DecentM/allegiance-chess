import test from 'ava'
import { BoardMemory } from './board-memory'
import { write } from '../afen/writer'
import { tokenize } from '../afen/tokenizer'
import { parse } from '../afen/parser'

/**
 * Cases 1-3 from:
 * https://www.chess.com/terms/fen-chess
 */

test('case 1', (t) => {
  const memory = new BoardMemory()

  memory.fromAFEN(parse(tokenize('4k2r/6r1/8/8/8/8/3R4/R3K3 w Qk - 0 1')))

  t.snapshot(memory.dump())
})

test('case 2', (t) => {
  const memory = new BoardMemory()

  memory.fromAFEN(
    parse(
      tokenize('rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1')
    )
  )

  t.snapshot(memory.dump())
})

test('case 3', (t) => {
  const memory = new BoardMemory()

  memory.fromAFEN(
    parse(tokenize('8/5k2/3p4/1p1Pp2p/pP2Pp1P/P4P1K/8/8 b - - 99 50'))
  )

  t.snapshot(memory.dump())
})

test('case 4', (t) => {
  const memory = new BoardMemory()

  memory.fromAFEN(
    parse(
      tokenize(
        'rnbqkbnr/pppppp>p>p/8/8/4P>3/8/PPPP>1PPP/RNBQKBNR b KQkq e3 0 1'
      )
    )
  )

  t.snapshot(memory.dump())
})

test('clones with state', (t) => {
  const m = new BoardMemory()

  m.fromAFEN(parse(tokenize('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR')))

  const m1 = m.clone()

  t.is(m.dump(), m1.dump())
})

test('generates afen from endgame position', (t) => {
  const m = new BoardMemory()
  const input = '6n>1/p5k1/4R3/2B4p/8/7p/PP3Pp>1/6K1 w - - 47 94'

  m.fromAFEN(parse(tokenize(input)))

  const result = write(m.toAFEN())

  t.is(result, input)
})

test('generates afen from start position', (t) => {
  const m = new BoardMemory()
  const input = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 0'

  m.fromAFEN(parse(tokenize(input)))

  const result = write(m.toAFEN())

  t.is(result, input)
})
