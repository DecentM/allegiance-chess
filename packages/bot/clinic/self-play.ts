import { AfenPreset, Board, Notation } from '@decentm/allegiance-chess-core'
import { randomBytes } from 'node:crypto'
import { findBestMove } from '../src/engine'

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

  console.clear()
  console.log(seed, Notation.writeNode(moves[index]), score, '\n')

  b.executeMoveIndex(index)

  console.log(b.toAFEN(), '\n')
  console.log(b.dump(), '\n')
  console.log(b.getMoveHistory())
}
