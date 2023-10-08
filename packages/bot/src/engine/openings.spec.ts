import test from 'ava'

import * as Openings from './openings'

test('finds an opening by fen', (t) => {
  const result = Openings.getNamesByFen(
    'rnbqkbnr/pppppppp/8/8/8/P7/1PPPPPPP/RNBQKBNR w - - 0 0'
  )

  t.is(result[0], 'Anderssen Opening')
})

test('finds existing fen', (t) => {
  const result = Openings.fenExists(
    'rnbqkbnr/pppppppp/8/8/8/P7/1PPPPPPP/RNBQKBNR w - - 0 0'
  )

  t.true(result)
})
