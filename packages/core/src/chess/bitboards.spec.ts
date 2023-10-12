import test from 'ava'

import { Bitboards } from './bitboards'

test('toggles index', (t) => {
  const input = 0b0010
  const result = Bitboards.toggleIndex(input, 1)

  t.is(result, 0b0000)
})

test('enlarges number as needed when toggling', (t) => {
  const input = 0b0010
  const result = Bitboards.toggleIndex(input, 4)

  t.is(result, 0b10010)
})

test('clears index', (t) => {
  const input = 0b00101
  const result = Bitboards.clearIndex(input, 2)

  t.is(result, 0b00001)
})

test('sets index', (t) => {
  const input = 0b00101
  const result = Bitboards.setIndex(input, 1)

  t.is(result, 0b00111)
})
