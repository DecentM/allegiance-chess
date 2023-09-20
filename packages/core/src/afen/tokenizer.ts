type SeparatorToken = {
  kind: 'separator'
}

type AllegianceToken = {
  kind: 'allegiance'
}

type CharToken = {
  kind: 'char'
  value: string
}

type NumberToken = {
  kind: 'number'
  value: number
}

type SpaceToken = {
  kind: 'space'
}

type HyphenToken = {
  kind: 'hyphen'
}

export type Token =
  | SeparatorToken
  | AllegianceToken
  | CharToken
  | NumberToken
  | SpaceToken
  | HyphenToken

export type TokenKind = Token['kind']

export const tokenize = (input: string): Token[] => {
  let cursor = 0
  const tokens: Token[] = []

  const token = (length, token: Token) => {
    tokens.push(token)
    cursor += length
  }

  const consumeUntil = (predicate: (char: string) => boolean) => {
    let result = ''
    let subcursor = cursor

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const current = input[subcursor]

      // Prevent infinite loops by sanity checking that we're still inside the
      // source string. Also break if we reached the target character
      if (subcursor >= input.length || predicate(current)) {
        // Prevent consuming the target character by rewinding the cursor
        subcursor--

        break
      }

      result += current
      subcursor++
    }

    return result
  }

  while (cursor < input.length) {
    const current = input[cursor]

    if (current === '>') {
      token(1, { kind: 'allegiance' })
      continue
    }

    if (current === '/') {
      token(1, { kind: 'separator' })
      continue
    }

    if (/\d/gu.test(current)) {
      const fullNumber = consumeUntil((char) => !/[\d]/gu.test(char))

      token(fullNumber.length, {
        kind: 'number',
        value: Number.parseInt(fullNumber, 10),
      })
      continue
    }

    if (current === ' ') {
      token(1, { kind: 'space' })
      continue
    }

    if (current === '-' || current === '–') {
      token(1, { kind: 'hyphen' })
      continue
    }

    token(1, {
      kind: 'char',
      value: current,
    })
  }

  return tokens
}
