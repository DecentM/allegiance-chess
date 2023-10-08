import { AfenPreset, Board, Notation } from '@decentm/allegiance-chess-core'
import { randomBytes } from 'node:crypto'

import { findBestMove } from '../src/engine'
import * as Openings from '../src/engine/openings'

const b = new Board()

b.importAFEN(AfenPreset.VanillaDefault)

const _seed = randomBytes(8).toString('hex')

// eslint-disable-next-line no-constant-condition
while (true) {
  const moves = b.getValidMoves()

  if (moves.length === 1) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const move = moves.at(0)!

    if (move.kind === 'game-over') {
      console.log('Game over!', move.outcome, move.reason)
      break
    }
  }

  const { index, score, seed } = findBestMove(b, 3, _seed)

  if (index === -1) {
    console.log('No moves!')
    break
  }

  const move = b.executeMoveIndex(index)
  const openings = Openings.getNamesByFen(b.toAFEN({ sections: ['positions'] }))

  console.clear()
  console.log(seed, Notation.writeNode(move), score, '\n')
  console.log(b.toAFEN(), '\n')
  console.log(
    'openings:',
    openings.length < 10 ? openings.join(', ') : openings.length,
    '\n'
  )
  console.log(b.dump(), '\n')
  console.log(b.getMoveHistory())
}
