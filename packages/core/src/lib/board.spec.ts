import test from 'ava'

import { getCoordsForIndex } from './board'
import { Coordinates } from '../notation/parser'

const macro = test.macro<[number, Coordinates]>((t, input, expected) => {
  t.deepEqual(getCoordsForIndex(input), expected)
})

test('finds rank 8 file 1', macro, 0, { file: 1, rank: 8 })
test('finds rank 8', macro, 1, { file: 2, rank: 8 })
test('finds rank 7', macro, 11, { file: 4, rank: 7 })
test('finds rank 6', macro, 20, { file: 5, rank: 6 })
test('finds rank 5', macro, 29, { file: 6, rank: 5 })
test('finds rank 4', macro, 38, { file: 7, rank: 4 })
test('finds rank 3', macro, 47, { file: 8, rank: 3 })
test('finds rank 2', macro, 48, { file: 1, rank: 2 })
test('finds rank 1', macro, 58, { file: 3, rank: 1 })
test('finds rank 1 file 8', macro, 63, { file: 8, rank: 1 })
