import test from 'ava'

import { parse } from './parser'
import { tokenize } from './tokenizer'

import { write } from './writer'

test('rewrites endgame afen', (t) => {
  const input = '6n>1/p5k1/4R3/2B4p/8/7p/PP3Pp>1/6K1 w - - 47 94'

  const parsed = parse(tokenize(input))
  const result = write(parsed)

  t.is(result, input)
})

test('rewrites start afen', (t) => {
  const input = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 0'

  const parsed = parse(tokenize(input))
  const result = write(parsed)

  t.is(result, input)
})

test('adds missing information', (t) => {
  const input = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'

  const parsed = parse(tokenize(input))
  const result = write(parsed)

  t.is(result, 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 0')
})
