import test from 'ava'

import { tokenize } from './tokenizer'

test('tokenizes', (t) => {
  const tokens = tokenize('Qxd8Qxd2 e.p.Ka5 Nxf7#1-0')

  t.snapshot(tokens)
})

test('wikipedia moves', (t) => {
  const tokens = tokenize(`
    1. Nf3 Nf6
    2. c4 g6
    3. Nc3 Bg7
    4. d4 O-O
    5. Bf4 d5
    6. Qb3 dxc4
    7. Qxc4 c6
    8. e4 Nbd7
    9. Rd1 Nb6
    10. Qc5 Bg4
    11. Bg5 Na4
    12. Qa3 Nxc3
    13. bxc3 Nxe4
    14. Bxe7 Qb6
    15. Bc4 Nxc3
    16. Bc5 Rfe8+
    17. Kf1 Be6
    18. Bxb6 Bxc4+
    19. Kg1 Ne2+
    20. Kf1 Nxd4+
    21. Kg1 Ne2+
    22. Kf1 Nc3+
    23. Kg1 axb6
    24. Qb4 Ra4
    25. Qxb6 Nxd1
    26. h3 Rxa2
    27. Kh2 Nxf2
    28. Re1 Rxe1
    29. Qd8+ Bf8
    30. Nxe1 Bd5
    31. Nf3 Ne4
    32. Qb8 b5
    33. h4 h5
    34. Ne5 Kg7
    35. Kg1 Bc5+
    36. Kf1 Ng3+
    37. Ke1 Bb4+
    38. Kd1 Bb3+
    39. Kc1 Ne2+
    40. Kb1 Nc3+
    41. Kc1 Rc2# 0-1
  `)

  t.snapshot(tokens)
})

// http://www.saremba.de/chessgml/standards/pgn/pgn-complete.htm#c2.3
test('specs', (t) => {
  const tokens =
    tokenize(`1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3
O-O 9. h3 Nb8 10. d4 Nbd7 11. c4 c6 12. cxb5 axb5 13. Nc3 Bb7 14. Bg5 b4 15.
Nb1 h6 16. Bh4 c5 17. dxe5 Nxe4 18. Bxe7 Qxe7 19. exd6 Qf6 20. Nbd2 Nxd6 21.
Nc4 Nxc4 22. Bxc4 Nb6 23. Ne5 Rae8 24. Bxf7+ Rxf7 25. Nxf7 Rxe1+ 26. Qxe1 Kxf7
27. Qe3 Qg5 28. Qxg5 hxg5 29. b3 Ke6 30. a3 Kd6 31. axb4 cxb4 32. Ra5 Nd5 33.
f3 Bc8 34. Kf2 Bf5 35. Ra7 g6 36. Ra6+ Kc5 37. Ke1 Nf4 38. g3 Nxh3 39. Kd2 Kb5
40. Rd6 Kc5 41. Ra6 Nf2 42. g4 Bd3 43. Re6 1/2-1/2`)

  t.snapshot(tokens)
})

test('allegiance', (t) => {
  const tokens = tokenize('Qxd8Q>d2 e.p.Ka5 Nxf7N>d2#1-0')

  t.snapshot(tokens)
})

test('tokenizes white queenside castling', (t) => {
  const tokens = tokenize('1. O-O-O')

  t.deepEqual(tokens, [
    {
      kind: 'step-number',
      source: {
        column: 1,
        length: 2,
        row: 1,
      },
      value: 1,
    },
    {
      kind: 'move-separator',
      source: {
        column: 3,
        length: 1,
        row: 1,
      },
    },
    {
      kind: 'castle',
      side: 'queen',
      source: {
        column: 4,
        length: 5,
        row: 1,
      },
    },
  ])
})

test('tokenizes promotions', (t) => {
  const tokens = tokenize('b8=Q')

  t.deepEqual(tokens, [
    {
      kind: 'file',
      source: {
        column: 1,
        length: 1,
        row: 1,
      },
      value: 2,
    },
    {
      kind: 'rank',
      source: {
        column: 2,
        length: 1,
        row: 1,
      },
      value: 8,
    },
    {
      kind: 'promotion',
      source: {
        column: 3,
        length: 1,
        row: 1,
      },
    },
    {
      kind: 'piece',
      source: {
        column: 4,
        length: 1,
        row: 1,
      },
      value: 'Q',
    },
  ])
})

test('tokenizes comments', (t) => {
  const tokens = tokenize('{ [%eval 0.12] }')

  t.deepEqual(tokens, [
    {
      kind: 'comment',
      value: '[%eval 0.12]',
      source: {
        column: 1,
        length: 16,
        row: 1,
      },
    },
  ])
})

test('tokenizes halfmove marker', (t) => {
  const tokens = tokenize('1. d4 1... Nf6')

  t.deepEqual(tokens, [
    {
      kind: 'step-number',
      source: {
        column: 1,
        length: 2,
        row: 1,
      },
      value: 1,
    },
    {
      kind: 'move-separator',
      source: {
        column: 3,
        length: 1,
        row: 1,
      },
    },
    {
      kind: 'file',
      source: {
        column: 4,
        length: 1,
        row: 1,
      },
      value: 4,
    },
    {
      kind: 'rank',
      source: {
        column: 5,
        length: 1,
        row: 1,
      },
      value: 4,
    },
    {
      kind: 'move-separator',
      source: {
        column: 6,
        length: 1,
        row: 1,
      },
    },
    {
      kind: 'step-number',
      source: {
        column: 7,
        length: 4,
        row: 1,
      },
      value: 1,
    },
    {
      kind: 'move-separator',
      source: {
        column: 11,
        length: 1,
        row: 1,
      },
    },
    {
      kind: 'piece',
      source: {
        column: 12,
        length: 1,
        row: 1,
      },
      value: 'N',
    },
    {
      kind: 'file',
      source: {
        column: 13,
        length: 1,
        row: 1,
      },
      value: 6,
    },
    {
      kind: 'rank',
      source: {
        column: 14,
        length: 1,
        row: 1,
      },
      value: 6,
    },
  ])
})
