import VError from "verror";
import { File, GameOutcome, Piece, Rank } from "./declarations";

type RankToken = {
  kind: "rank";
  value: Rank;
};

type ColumnToken = {
  kind: "file";
  value: File;
};

type PieceToken = {
  kind: "piece";
  value: Piece;
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
  outcome: GameOutcome;
};

type StepNumberToken = {
  kind: "step-number";
  value: number;
};

type MoveSeparatorToken = {
  kind: "move-separator";
};

export type Token = {
  source?: {
    column: number;
    row: number;
    length: number;
  };
} & (
  | RankToken
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
  | AllegianceToken
  | MoveSeparatorToken
);

export const tokenize = (rawInput: string): Token[] => {
  const input = rawInput.replace(/[–]/gu, "-");

  let row = 1;
  let column = 1;
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

    const token = (length: number, token: Token) => {
      tokens.push({ ...token, source: { column, row, length } });
      cursor += length;
      column += length;
    };

    if (current === "\n") {
      row++;
      column = 1;
      token(1, {
        kind: "move-separator",
      });
      continue;
    }

    if (current === "\r") {
      column = 1;
      cursor++;
      continue;
    }

    if (findWord("e.p.") || findWord(" e.p.")) {
      token(current === " " ? 5 : 4, {
        kind: "en-passant",
      });
      continue;
    }

    if (current === " " || current === ";") {
      token(1, {
        kind: "move-separator",
      });
      continue;
    }

    if (findWord("O-O") || findWord("0-0")) {
      token(3, {
        kind: "castle",
        side: "king",
      });
      continue;
    }

    if (findWord("O-O-O") || findWord("0-0-0")) {
      token(5, {
        kind: "castle",
        side: "queen",
      });
      continue;
    }

    if (current === "+" || current === "†") {
      token(1, {
        kind: "check",
      });
      continue;
    }

    if (findWord("ch")) {
      token(2, {
        kind: "check",
      });
      continue;
    }

    if (/[#‡≠X]/gu.test(current)) {
      token(1, {
        kind: "checkmate",
      });
      continue;
    }

    if (findWord("mate")) {
      token(4, {
        kind: "checkmate",
      });
      continue;
    }

    if (findWord("dbl ch")) {
      token(6, {
        kind: "double-check",
      });
      continue;
    }

    if (findWord("++")) {
      token(2, {
        kind: "double-check",
      });
      continue;
    }

    if (findWord("0-1")) {
      token(3, {
        kind: "game-over",
        outcome: "black",
      });
      continue;
    }

    if (findWord("1-0")) {
      token(3, {
        kind: "game-over",
        outcome: "white",
      });
      continue;
    }

    if (findWord("½-½")) {
      token(3, {
        kind: "game-over",
        outcome: "draw",
      });
      continue;
    }

    if (findWord("1/2-1/2")) {
      token(7, {
        kind: "game-over",
        outcome: "draw",
      });
      continue;
    }

    if (findWord("0-0")) {
      token(3, {
        kind: "game-over",
        outcome: "forfeit",
      });
      continue;
    }

    if (findWord("½-0")) {
      token(3, {
        kind: "game-over",
        outcome: "forfeit-white",
      });
      continue;
    }

    if (findWord("1/2-0")) {
      token(5, {
        kind: "game-over",
        outcome: "forfeit-white",
      });
      continue;
    }

    if (findWord("0-½")) {
      token(3, {
        kind: "game-over",
        outcome: "forfeit-black",
      });
      continue;
    }

    if (findWord("0-1/2")) {
      token(5, {
        kind: "game-over",
        outcome: "forfeit-black",
      });
      continue;
    }

    if (findWord("+/-")) {
      token(3, {
        kind: "game-over",
        outcome: "default-white",
      });
      continue;
    }

    if (findWord("-/+")) {
      token(3, {
        kind: "game-over",
        outcome: "default-black",
      });
      continue;
    }

    if (findWord("-/-")) {
      token(3, {
        kind: "game-over",
        outcome: "default",
      });
      continue;
    }

    if (/[\d]/gu.test(current)) {
      const fullNumber = consumeUntil((char) => !/[\d]/gu.test(char));
      const isStepNumber = input[cursor + fullNumber.length] === ".";

      if (isStepNumber) {
        token(fullNumber.length + 1, {
          kind: "step-number",
          value: Number.parseInt(fullNumber, 10),
        });
        continue;
      }
    }

    if (/[1-8]/gu.test(current)) {
      token(1, {
        kind: "rank",
        value: Number.parseInt(current, 10) as Rank,
      });
      continue;
    }

    if (/[a-h]/gu.test(current)) {
      token(1, {
        kind: "file",
        value: Number.parseInt(current, 10) as File,
      });
      continue;
    }

    if (/[KQRBN]/gu.test(current)) {
      token(1, {
        kind: "piece",
        value: current as PieceToken["value"],
      });
      continue;
    }

    if (/[x:]/gu.test(current)) {
      token(1, {
        kind: "capture",
      });
      continue;
    }

    if (findWord("(=)")) {
      token(3, {
        kind: "draw-offer",
      });
      continue;
    }

    if (current === "=" || current === "/") {
      token(1, {
        kind: "promotion",
      });
      continue;
    }

    if (current === "(" || current === ")") {
      token(1, {
        kind: "promotion",
        bracket: current === "(" ? "open" : "close",
      });
      continue;
    }

    if (current === ">") {
      token(1, {
        kind: "allegiance",
      });
      continue;
    }

    throw new VError(
      `Unsupported character at line ${row} column ${column}: "${current}"`
    );
  }

  return tokens;
};
