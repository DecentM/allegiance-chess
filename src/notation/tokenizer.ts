import VError from "verror";

type NumberToken = {
  kind: "number";
  value: number;
};

type ColumnToken = {
  kind: "column";
  value: "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";
};

type PieceToken = {
  kind: "piece";
  value: "K" | "Q" | "R" | "B" | "N";
};

type EnPassantToken = {
  kind: "en-passant";
};

type CaptureToken = {
  kind: "capture";
};

type PromotionToken = {
  kind: "promotion";
  bracket?: "open" | "close";
};

type DrawOfferToken = {
  kind: "draw-offer";
};

type CastleToken = {
  kind: "castle";
  side: "queen" | "king";
};

type CheckToken = {
  kind: "check";
};

type CheckmateToken = {
  kind: "checkmate";
};

type DoubleCheckToken = {
  kind: "double-check";
};

type AllegianceToken = {
  kind: "allegiance";
};

type GameOverToken = {
  kind: "game-over";
  outcome:
    | "white"
    | "black"
    | "draw"
    | "forfeit"
    | "forfeit-white"
    | "forfeit-black"
    | "default"
    | "default-white"
    | "default-black";
};

type StepNumberToken = {
  kind: "step-number";
  value: number;
};

export type Token =
  | NumberToken
  | ColumnToken
  | PieceToken
  | CaptureToken
  | EnPassantToken
  | PromotionToken
  | DrawOfferToken
  | CastleToken
  | CheckToken
  | CheckmateToken
  | DoubleCheckToken
  | GameOverToken
  | StepNumberToken
  | AllegianceToken;

export const tokenize = (rawInput: string): Token[] => {
  const input = rawInput.replace("–", "-").replace("\r", "");
  let row = 1;
  let cursor = 0;
  const tokens: Token[] = [];

  while (cursor < input.length) {
    let current = input[cursor];

    const findWord = (target: string) => {
      return input.substring(cursor, cursor + target.length) === target;
    };

    const consumeUntil = (predicate: (char: string) => boolean) => {
      let result = "";
      let subcursor = cursor;

      while (true) {
        const current = input[subcursor];

        // Prevent infinite loops by sanity checking that we're still inside the
        // source string. Also break if we reached the target character
        if (subcursor >= input.length || predicate(current)) {
          // Prevent consuming the target character by rewinding the cursor
          subcursor--;

          break;
        }

        result += current;
        subcursor++;
      }

      return result;
    };

    if (current === "\n") {
      row++;
    }

    if ([" ", "\n"].includes(current)) {
      cursor++;
      continue;
    }

    if (findWord("O-O") || findWord("0-0")) {
      tokens.push({
        kind: "castle",
        side: "king",
      });
      cursor += 3;
      continue;
    }

    if (findWord("O-O-O") || findWord("0-0-0")) {
      tokens.push({
        kind: "castle",
        side: "queen",
      });
      cursor += 5;
      continue;
    }

    if (current === "+" || current === "†") {
      tokens.push({
        kind: "check",
      });
      cursor++;
      continue;
    }

    if (findWord("ch")) {
      tokens.push({
        kind: "check",
      });
      cursor += 2;
      continue;
    }

    if (/[#‡≠X]/gu.test(current)) {
      tokens.push({
        kind: "checkmate",
      });
      cursor++;
      continue;
    }

    if (findWord("mate")) {
      tokens.push({
        kind: "checkmate",
      });
      cursor += 4;
      continue;
    }

    if (findWord("dbl ch")) {
      tokens.push({
        kind: "double-check",
      });
      cursor += 6;
      continue;
    }

    if (findWord("++")) {
      tokens.push({
        kind: "double-check",
      });
      cursor += 2;
      continue;
    }

    if (findWord("0-1")) {
      tokens.push({
        kind: "game-over",
        outcome: "black",
      });
      cursor += 3;
      continue;
    }

    if (findWord("1-0")) {
      tokens.push({
        kind: "game-over",
        outcome: "white",
      });
      cursor += 3;
      continue;
    }

    if (findWord("½-½")) {
      tokens.push({
        kind: "game-over",
        outcome: "draw",
      });
      cursor += 3;
      continue;
    }

    if (findWord("1/2-1/2")) {
      tokens.push({
        kind: "game-over",
        outcome: "draw",
      });
      cursor += 7;
      continue;
    }

    if (findWord("0-0")) {
      tokens.push({
        kind: "game-over",
        outcome: "forfeit",
      });
      cursor += 3;
      continue;
    }

    if (findWord("½-0")) {
      tokens.push({
        kind: "game-over",
        outcome: "forfeit-white",
      });
      cursor += 3;
      continue;
    }

    if (findWord("1/2-0")) {
      tokens.push({
        kind: "game-over",
        outcome: "forfeit-white",
      });
      cursor += 5;
      continue;
    }

    if (findWord("0-½")) {
      tokens.push({
        kind: "game-over",
        outcome: "forfeit-black",
      });
      cursor += 3;
      continue;
    }

    if (findWord("0-1/2")) {
      tokens.push({
        kind: "game-over",
        outcome: "forfeit-black",
      });
      cursor += 5;
      continue;
    }

    if (findWord("+/-")) {
      tokens.push({
        kind: "game-over",
        outcome: "default-white",
      });
      cursor += 3;
      continue;
    }

    if (findWord("-/+")) {
      tokens.push({
        kind: "game-over",
        outcome: "default-black",
      });
      cursor += 3;
      continue;
    }

    if (findWord("-/-")) {
      tokens.push({
        kind: "game-over",
        outcome: "default",
      });
      cursor += 3;
      continue;
    }

    if (/[\d]/gu.test(current)) {
      const fullNumber = consumeUntil((char) => !/[\d]/gu.test(char));
      const isStepNumber = input[cursor + fullNumber.length] === ".";

      if (isStepNumber) {
        tokens.push({
          kind: "step-number",
          value: Number.parseInt(fullNumber, 10),
        });
        cursor += fullNumber.length + 1;
        continue;
      }
    }

    if (/[1-8]/gu.test(current)) {
      tokens.push({
        kind: "number",
        value: Number.parseInt(current, 10),
      });
      cursor++;
      continue;
    }

    if (findWord("e.p.")) {
      tokens.push({
        kind: "en-passant",
      });
      cursor += 4;
      continue;
    }

    if (/[a-h]/gu.test(current)) {
      tokens.push({
        kind: "column",
        value: current as ColumnToken["value"],
      });
      cursor++;
      continue;
    }

    if (/[KQRBN]/gu.test(current)) {
      tokens.push({
        kind: "piece",
        value: current as PieceToken["value"],
      });
      cursor++;
      continue;
    }

    if (/[x:]/gu.test(current)) {
      tokens.push({
        kind: "capture",
      });
      cursor++;
      continue;
    }

    if (findWord("(=)")) {
      tokens.push({
        kind: "draw-offer",
      });
      cursor += 3;
      continue;
    }

    if (current === "=" || current === "/") {
      tokens.push({
        kind: "promotion",
      });
      cursor++;
      continue;
    }

    if (current === "(" || current === ")") {
      tokens.push({
        kind: "promotion",
        bracket: current === "(" ? "open" : "close",
      });
      cursor++;
      continue;
    }

    if (current === ">") {
      tokens.push({
        kind: "allegiance",
      });
      cursor++;
      continue;
    }

    throw new VError(`Unsupported character in line ${row}: "${current}"`);
  }

  return tokens;
};
