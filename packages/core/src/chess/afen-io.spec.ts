import test from 'ava'

import { Afen } from '..'
import { AfenPreset } from '../lib/afen-preset'
import { NeoBoard } from './neo-board'

test('imports starting position', (t) => {
  const b = new NeoBoard({ width: 8, height: 8 })

  b.afen.import(Afen.parse(Afen.tokenize(AfenPreset.VanillaDefault)))

  t.is(Afen.write(b.afen.export()), AfenPreset.VanillaDefault)
})
