import test from 'ava'

import * as Piece from './piece'
import { NeoBoard } from './neo-board'

test('executes simple moves', (t) => {
  const b = new NeoBoard({ height: 8, width: 8 })

  b.setSquare(0, NeoBoard.square(Piece.Type.Queen | Piece.Allegiance.White))
  b.setSquare(9, NeoBoard.square(Piece.Type.Queen | Piece.Allegiance.Black))

  t.log(b.dump())
})
