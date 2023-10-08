import { Board, Notation } from '@decentm/allegiance-chess-core'
import { findBestMove } from '../src/engine'

const b = new Board()

b.importAFEN('rnbqkbnr/ppp1pppp/8/3p4/8/2N5/PPPPPPPP/R1BQKBNR w KQkq d6 0 1')
b.importMoveHistory('1. b1c3 d7d5')

const moves = b.getValidMoves()

console.log('Searching', moves.length, 'moves')

const { index, score } = findBestMove(b, 3)

console.log(
  'Best move is move',
  index,
  'score',
  `${score}:`,
  Notation.writeNode(moves[index])
)
