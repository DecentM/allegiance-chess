import { AfenPreset, Board } from '@decentm/allegiance-chess-core'

import { Bot } from '../src/engine'

const b = new Board()

b.importAFEN(AfenPreset.VanillaDefault)

console.log('Running performance benchmark...')
const start = performance.now()

let MOVES = 4

const history: number[] = []

const bot = new Bot()

// eslint-disable-next-line no-constant-condition
while (MOVES > 0) {
  const moveStart = performance.now()

  const { index, score } = bot.findBestMove(3)

  if (index === -1) {
    console.log('No moves!')
    break
  }

  const move = b.executeMoveIndex(index)

  history.push(performance.now() - moveStart)
  console.log('Move', MOVES, 'complete in', history.at(-1))
  MOVES--
  // const openings = Openings.getNamesByFen(b.toAFEN({ sections: ['positions'] }))

  // console.clear()
  // console.log(seed, Notation.writeNode(move), score, '\n')
  // console.log(b.toAFEN(), '\n')
  // console.log(
  //   'openings:',
  //   openings.length < 10 ? openings.join(', ') : openings.length,
  //   '\n'
  // )
  // console.log(b.dump(), '\n')
  // console.log(b.getMoveHistory())
}

console.log('Benchmark done in', performance.now() - start)
console.log(
  'Average move time:',
  history.reduce((prev, cur) => prev + cur, 0) / history.length
)
