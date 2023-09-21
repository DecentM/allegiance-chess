import test from 'ava'
import { tokenize } from './tokenizer'

test('tokenizes', (t) => {
  const tokens = tokenize('8/5k2/3p>4/1p1P>p2p/pP2Pp1P/P4P1K/8/8 b - - 99 50')

  t.snapshot(tokens)
})
