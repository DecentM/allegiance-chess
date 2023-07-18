import VError from "verror";

import { Token } from "./tokenizer";
import { Column, GameOutcome, Piece, Rank } from "./declarations";

export type Coordinates = {
  column: Column;
  rank: Rank;
};

type MoveNode<T = void> = {
  kind: "move";
  type: T;
  piece: Piece;
  from: Coordinates;
  to: Coordinates;
  causesCheck: boolean;
  isMate: boolean;
};

type EnPassantNode = MoveNode<"en-passant">;

type CaptureNode = MoveNode<"capture">;

type CastleNode = MoveNode<"castle"> & {
  side: "king" | "queen";
};

type PromotionNode = MoveNode<"promotion"> & {
  promotionTo: Piece;
};

type DrawOfferNode = {
  kind: "draw-offer";
};

type AllegianceNode = MoveNode<"allegiance">;

type GameOverNode = {
  kind: "game-over";
  outcome: GameOutcome;
};

type Node = { sources: Token[] } & (
  | MoveNode
  | EnPassantNode
  | CaptureNode
  | CastleNode
  | PromotionNode
  | AllegianceNode
  | DrawOfferNode
  | GameOverNode
);

type AnyMoveNode =
  | EnPassantNode
  | CaptureNode
  | CastleNode
  | PromotionNode
  | AllegianceNode;

export type RootNode = {
  kind: "root";
  children: Node[];
};

class WipNode {
  moveType?: AnyMoveNode["type"];
  columns: Column[] = [];
  ranks: Rank[] = [];
  pieces: Piece[] = [];
  castleSide: "king" | "queen";
  causesCheck: boolean;
  isMate: boolean;

  isDrawOffer: boolean;

  isGameOver: boolean;
  outcome: GameOutcome;

  tokens: Token[] = [];

  isEmpty() {
    return (
      !this.moveType &&
      this.columns.length === 0 &&
      this.ranks.length === 0 &&
      this.pieces.length === 0 &&
      !this.castleSide &&
      typeof this.isDrawOffer === "undefined" &&
      typeof this.isGameOver === "undefined"
    );
  }

  toNode(): Node {
    if (this.isDrawOffer) {
      return {
        sources: this.tokens,
        kind: "draw-offer",
      };
    }

    if (this.isGameOver) {
      return {
        sources: this.tokens,
        kind: "game-over",
        outcome: this.outcome,
      };
    }

    const moveResult: MoveNode = { from: {}, to: {} } as MoveNode;

    if (this.pieces[0]) moveResult.piece = this.pieces[0];

    moveResult.kind = "move";

    if (this.causesCheck) moveResult.causesCheck = this.causesCheck;
    if (this.isMate) moveResult.isMate = this.isMate;

    if (this.columns.length === 2) {
      moveResult.from.column = this.columns[0];
      moveResult.to.column = this.columns[1];
    } else if (this.columns.length === 1) {
      moveResult.to.column = this.columns[0];
    } else if (this.columns.length !== 0) {
      throw new VError(
        `Parsed ${this.columns.length} columns for a single move`
      );
    }

    if (this.ranks.length === 2) {
      moveResult.from.rank = this.ranks[0];
      moveResult.to.rank = this.ranks[1];
    } else if (this.ranks.length === 1) {
      moveResult.to.rank = this.ranks[0];
    } else if (this.ranks.length !== 0) {
      throw new VError(`Parsed ${this.ranks.length} ranks for a single move`);
    }

    if (this.moveType === "allegiance") {
      return {
        ...moveResult,
        type: "allegiance",
        sources: this.tokens,
      };
    }

    if (this.moveType === "capture") {
      return {
        ...moveResult,
        type: "capture",
        sources: this.tokens,
      };
    }

    if (this.moveType === "castle") {
      return {
        ...moveResult,
        type: "castle",
        side: this.castleSide,
        sources: this.tokens,
      };
    }

    if (this.moveType === "en-passant") {
      return {
        ...moveResult,
        type: "en-passant",
        sources: this.tokens,
      };
    }

    if (this.moveType === "promotion") {
      return {
        ...moveResult,
        type: "promotion",
        promotionTo: this.pieces[1],
        sources: this.tokens,
      };
    }

    return { ...moveResult, sources: this.tokens };
  }
}

export const parse = (tokens: Token[]): RootNode => {
  let cursor = 0;

  const moveBeginning: Token["kind"][] = [
    "castle",
    "draw-offer",
    "piece",
    "step-number",
    "game-over",
    "column",
    "move-separator",
  ];

  // List of moves that are acceptable. On a clean slate, these things are
  // epected
  const expectedTokens: Set<Token["kind"]> = new Set(moveBeginning);

  const expect = (...tokens: Token["kind"][]) => {
    expectedTokens.clear();
    tokens.forEach((token) => expectedTokens.add(token));
  };

  while (cursor < tokens.length) {
    const current = tokens[cursor];

    if (!expectedTokens.has(current.kind)) {
      throw new VError(
        `Parse error on line ${current.source?.row} column ${
          current.source?.column
        }: Token kind "${current.kind}" was not expected after "${
          tokens[cursor - 1]?.kind
        }"`
      );
    }

    switch (current.kind) {
      case "move-separator":
        expect(...moveBeginning, "step-number", "capture");
        break;

      case "step-number":
        expect(...moveBeginning, "move-separator");
        break;

      case "promotion":
        expect("piece");
        break;

      case "allegiance":
      case "capture":
        expect("column");
        break;

      case "castle":
      case "double-check":
      case "check":
      case "en-passant":
        expect(...moveBeginning);
        break;

      case "checkmate":
        expect("game-over", "move-separator");
        break;

      case "column":
        expect("rank", "capture", "allegiance", "column");
        break;

      case "draw-offer":
        expect(...moveBeginning, "game-over");
        break;

      case "game-over":
        expect("move-separator");
        break;

      case "rank":
        expect(
          ...moveBeginning,
          "allegiance",
          "capture",
          "check",
          "checkmate",
          "double-check",
          "en-passant",
          "promotion"
        );
        break;

      case "piece":
        expect(
          "capture",
          "allegiance",
          "check",
          "checkmate",
          "game-over",
          "column",
          "double-check",
          "en-passant",
          "promotion"
        );
        break;
    }

    cursor++;
  }

  cursor = 0;

  const result: RootNode = {
    kind: "root",
    children: [],
  };

  let wipNode: WipNode = new WipNode();

  const newNode = () => {
    if (wipNode.isEmpty()) {
      return;
    }

    result.children.push(wipNode.toNode());
    wipNode = new WipNode();
  };

  const nextTokenKind = () => {
    return tokens[cursor + 1]?.kind;
  };

  while (cursor < tokens.length) {
    const current = tokens[cursor];

    wipNode.tokens.push(current);

    switch (current.kind) {
      case "move-separator":
        if (nextTokenKind() !== "en-passant") newNode();

        break;

      case "piece":
        wipNode.pieces.push(current.value);
        break;

      case "allegiance":
        wipNode.moveType = "allegiance";
        break;

      case "capture":
        wipNode.moveType = "capture";
        break;

      case "castle":
        wipNode.moveType = "castle";
        wipNode.castleSide = current.side;

        if (nextTokenKind() !== "move-separator") newNode();
        break;

      case "check":
      case "double-check":
        wipNode.causesCheck = true;
        wipNode.isMate = false;

        if (nextTokenKind() !== "move-separator") newNode();
        break;

      case "checkmate":
        wipNode.causesCheck = true;
        wipNode.isMate = true;

        if (nextTokenKind() !== "move-separator") newNode();
        break;

      case "column":
        wipNode.columns.push(current.value);
        break;

      case "rank":
        wipNode.ranks.push(current.value);
        break;

      case "draw-offer":
        wipNode.isDrawOffer = true;

        if (nextTokenKind() !== "move-separator") newNode();
        break;

      case "en-passant":
        wipNode.moveType = "en-passant";

        if (nextTokenKind() !== "move-separator") newNode();
        break;

      case "promotion":
        wipNode.moveType = "promotion";
        break;

      case "game-over":
        wipNode.isGameOver = true;
        wipNode.outcome = current.outcome;

        if (nextTokenKind() !== "move-separator") newNode();
        break;
    }

    cursor++;
  }

  return result;
};
