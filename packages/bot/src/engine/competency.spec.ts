import test from 'ava'

import { Bot } from '.'

test('saves the knight', (t) => {
  t.timeout(Number.POSITIVE_INFINITY)

  const bot = new Bot('0.5834624105388075')

  bot.board.importAFEN(
    'rnbqkbnr/ppppp3/8/5p>p1/6N1/7p/PPPPPP1P/RNBQKR>R1 w Qkq - 1 8'
  )

  const result = bot.findBestMove(3)

  t.log(result)
  t.log(bot.board.dump())

  t.true(result.path?.split(',')[0].startsWith('Ng4'))
})
