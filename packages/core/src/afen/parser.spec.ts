import test from 'ava'
import { tokenize } from './tokenizer'
import { PieceNode, parse } from './parser'

test('case 1', (t) => {
  const tokens = tokenize('8/5k2/3p>4/1p1P>p2p/pP2Pp1P/P4P1K/8/8 b - - 99 50')
  const ast = parse(tokens)

  t.snapshot(ast)
})

test('case 2', (t) => {
  const tokens = tokenize('4k2r/6r1/8/8/8/8/3R4/R3K3 w Qk - 0 1')
  const ast = parse(tokens)

  t.snapshot(ast)
})

test('parses last character with no metadata', (t) => {
  const tokens = tokenize('rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR')
  const ast = parse(tokens)

  t.is((ast.children.at(-1) as PieceNode).value.piece, 'R')
})

test('parses last character with allegiance with no metadata', (t) => {
  const tokens = tokenize('rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR>')
  const ast = parse(tokens)

  t.is((ast.children.at(-1) as PieceNode).value.piece, 'R')
})
