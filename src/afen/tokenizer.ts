type SeparatorToken = {
  kind: "separator";
};

type AllegianceToken = {
  kind: "allegiance";
};

type CharToken = {
  kind: "char";
  value: string;
};

type NumberToken = {
  kind: "number";
  value: number;
};

type SpaceToken = {
  kind: "space";
};

type HyphenToken = {
  kind: "hyphen";
};

export type Token =
  | SeparatorToken
  | AllegianceToken
  | CharToken
  | NumberToken
  | SpaceToken
  | HyphenToken;

export type TokenKind = Token["kind"];

export const tokenize = (input: string): Token[] => {
  let cursor = 0;
  const tokens: Token[] = [];

  const token = (token: Token) => {
    tokens.push(token);
    cursor++;
  };

  while (cursor < input.length) {
    const current = input[cursor];

    if (current === "+") {
      token({ kind: "allegiance" });
      continue;
    }

    if (current === "/") {
      token({ kind: "separator" });
      continue;
    }

    if (/\d/gu.test(current)) {
      token({
        kind: "number",
        value: Number.parseInt(current, 10),
      });
      continue;
    }

    if (current === " ") {
      token({ kind: "space" });
      continue;
    }

    if (current === "-" || current === "–") {
      token({ kind: "hyphen" });
      continue;
    }

    token({
      kind: "char",
      value: current,
    });
  }

  return tokens;
};
