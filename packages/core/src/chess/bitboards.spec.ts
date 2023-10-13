import test from 'ava'

import { Bitboards } from './bitboards'

test('toggles index', (t) => {
  const input = 0b0010n
  const result = Bitboards.toggleIndex(input, 1n)

  t.is(result, 0b0000n)
})

test('enlarges number as needed when toggling', (t) => {
  const input = 0b0010n
  const result = Bitboards.toggleIndex(input, 4n)

  t.is(result, 0b10010n)
})

test('clears index', (t) => {
  const input = 0b00101n
  const result = Bitboards.clearIndex(input, 2n)

  t.is(result, 0b00001n)
})

test('sets index', (t) => {
  const input = 0b00101n
  const result = Bitboards.setIndex(input, 1n)

  t.is(result, 0b00111n)
})
