import { Notation } from '@decentm/allegiance-chess-core'
import { Bot } from '../src/engine'

const bot = new Bot()

bot.board.importAFEN(
  'rnbqkbnr/ppp1pppp/8/3p4/8/2N5/PPPPPPPP/R1BQKBNR w KQkq d6 0 1'
)
bot.board.importMoveHistory('1. b1c3 d7d5')

const moves = bot.board.getValidMoves()

console.log('Searching', moves.length, 'moves')

const { index, score } = bot.findBestMove(3)

console.log(
  'Best move is move',
  index,
  'score',
  `${score}:`,
  Notation.writeNode(moves[index])
)
