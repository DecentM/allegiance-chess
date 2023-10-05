import test from 'ava'
import { Board } from '@decentm/allegiance-chess-core'

import { findBestMove } from '.'

test('finds move 1', (t) => {
  t.timeout(30_000, 'did not find move in 30s')

  const b = new Board()

  b.importAFEN('rnbqkbnr/ppp1pppp/8/3p4/8/2N5/PPPPPPPP/R1BQKBNR w KQkq d6 0 1')
  b.importMoveHistory('1. b1c3 d7d5')

  const { index } = findBestMove(b, 3, 'q')

  t.not(index, -1)

  const move = b.executeMoveIndex(index)

  t.log(b.dump())
  t.assert(move)
})
