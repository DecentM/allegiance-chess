import { AfenPreset, Board, Notation } from '@decentm/allegiance-chess-core'
import { randomBytes } from 'node:crypto'

import { Bot } from '../src/engine'
import * as Openings from '../src/engine/openings'

const b = new Board()

b.importAFEN(AfenPreset.VanillaDefault)

const seed = randomBytes(8).toString('hex')

const bot = new Bot(seed)

// eslint-disable-next-line no-constant-condition
while (true) {
  const moves = b.getValidMoves()

  if (moves.length === 1) {
    const move = moves[0]

    if (move.kind === 'game-over') {
      console.log('Game over!', move.outcome, move.reason)
      break
    }
  }

  const { index, score } = bot.findBestMove(3)

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
