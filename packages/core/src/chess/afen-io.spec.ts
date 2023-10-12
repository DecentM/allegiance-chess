import test from 'ava'

import { AfenPreset } from '../lib/afen-preset'
import { Board } from './board'

test('imports starting position', (t) => {
  const b = new Board({ width: 8, height: 8 })

  b.afen.import(AfenPreset.VanillaDefault)

  t.is(b.afen.export(), AfenPreset.VanillaDefault)
})
