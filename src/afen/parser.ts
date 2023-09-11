import VError from "verror";
import { Token, TokenKind } from "./tokenizer";
import { File, Piece, Rank } from "../notation/declarations";
import { PieceAllegiance } from "../chess/board";
import { CastleSide, Coordinates } from "../notation/parser";
import {
  isFile,
  isLowerPiece,
  isPiece,
  isRank,
  letterToFile,
} from "../lib/notation";

type PieceNode = {
  kind: "piece";
  value: {
    piece: Piece;
    allegiance: PieceAllegiance;
  };
};

type SkipNode = {
  kind: "skip";
  value: number;
};

type ActiveColourNode = {
  kind: "active-colour";
  value: "white" | "black";
};

type CastlingRightsNode = {
  kind: "castling-rights";
  value: {
    white: CastleSide[];
    black: CastleSide[];
  };
};

type EnPassantTargetsNode = {
  kind: "en-passant-targets";
  value: Coordinates;
};

type HalfmoveClockNode = {
  kind: "halfmove-clock";
  value: number;
};

type FullmoveNumberNode = {
  kind: "fullmove-number";
  value: number;
};

type Node =
  | PieceNode
  | SkipNode
  | ActiveColourNode
  | CastlingRightsNode
  | EnPassantTargetsNode
  | HalfmoveClockNode
  | FullmoveNumberNode;

type RootNode = {
  kind: "ast";
  children: Node[];
};

enum ParseState {
  Ranks,
  ActiveColour,
  CastlingRights,
  EnPassantTargets,
  HalfmoveClock,
  FullmoveNumber,
}

class WipNode {
  private pieceSide: "white" | "black";

  canSetPieceSide() {
    return !this.pieceSide;
  }

  setPieceSide(input: "white" | "black") {
    if (!this.canSetPieceSide()) {
      throw new VError(
        "Cannot set piece side on WipNode, because it's already set"
      );
    }

    this.pieceSide = input;
  }

  private piece: Piece | Lowercase<Piece> | null;

  canSetPiece() {
    return !this.piece && this.piece !== null;
  }

  setPiece(piece: Piece | Lowercase<Piece> | null) {
    if (!this.canSetPiece()) {
      throw new VError(
        "Cannot set piece on WipNode, because there is already one set"
      );
    }

    this.piece = piece;
  }

  private allegianceMark = false;

  canSetAllegianceMark() {
    return !this.allegianceMark;
  }

  addAllegianceMark() {
    if (!this.canSetAllegianceMark()) {
      throw new VError("Allegiance mark already set");
    }

    this.allegianceMark = true;
  }

  pieceDataReady() {
    return !this.canSetPiece() && !this.canSetPieceSide();
  }

  private activeColour: "white" | "black";

  setActiveColour(input: "white" | "black") {
    this.activeColour = input;
  }

  private castlingRights: Array<"Q" | "K" | "q" | "k"> = [];

  hasCastlingRights() {
    return this.castlingRights.length !== 0;
  }

  addCastlingRight(input: "Q" | "K" | "q" | "k") {
    this.castlingRights.push(input);
  }

  private enPassantFile: File;

  canSetEnPassantFile() {
    return !this.enPassantFile;
  }

  setEnPassantFile(file: File) {
    if (!this.canSetEnPassantFile()) {
      throw new VError(
        "Cannot set en passant file on WipNode, because there is already one set"
      );
    }

    this.enPassantFile = file;
  }

  private enPassantRank: Rank;

  canSetEnPassantRank() {
    return !this.enPassantRank;
  }

  setEnPassantRank(rank: Rank) {
    if (!this.canSetEnPassantRank()) {
      throw new VError(
        "Cannot set en passant rank on WipNode, because there is already one set"
      );
    }

    this.enPassantRank = rank;
  }

  private halfmoveClock: number;

  canSetHalfmoveClock() {
    return typeof this.halfmoveClock !== "number";
  }

  setHalfmoveClock(input: number) {
    this.halfmoveClock = input;
  }

  private fullmoveNumber: number;

  canSetFullmoveNumber() {
    return typeof this.fullmoveNumber !== "number";
  }

  setFullmoveNumber(input: number) {
    this.fullmoveNumber = input;
  }

  isEnPassantType() {
    return !!(this.enPassantFile && this.enPassantRank);
  }

  toNode(): Node {
    /**
     * PieceNode
     */
    if (this.piece || this.piece === null) {
      if (this.pieceSide === "white") {
        return {
          kind: "piece",
          value: {
            allegiance: this.allegianceMark
              ? PieceAllegiance.LightGrey
              : PieceAllegiance.White,
            piece: this.piece ? (this.piece.toUpperCase() as Piece) : null,
          },
        };
      }

      return {
        kind: "piece",
        value: {
          allegiance: this.allegianceMark
            ? PieceAllegiance.DarkGrey
            : PieceAllegiance.Black,
          piece: this.piece ? (this.piece.toUpperCase() as Piece) : null,
        },
      };
    }

    /**
     * ActiveColour
     */
    if (this.activeColour) {
      return {
        kind: "active-colour",
        value: this.activeColour,
      };
    }

    /**
     * CastlingRights
     */
    if (this.castlingRights.length > 0) {
      const black: CastleSide[] = [];
      const white: CastleSide[] = [];

      if (this.castlingRights.includes("K")) white.push("king");
      if (this.castlingRights.includes("Q")) white.push("queen");
      if (this.castlingRights.includes("k")) black.push("king");
      if (this.castlingRights.includes("q")) black.push("queen");

      return {
        kind: "castling-rights",
        value: {
          black,
          white,
        },
      };
    }

    /**
     * En passant target
     */
    if (this.enPassantFile && this.enPassantRank) {
      return {
        kind: "en-passant-targets",
        value: {
          file: this.enPassantFile,
          rank: this.enPassantRank,
        },
      };
    }

    /**
     * Halfmove clock
     */
    if (typeof this.halfmoveClock === "number") {
      return {
        kind: "halfmove-clock",
        value: this.halfmoveClock,
      };
    }

    /**
     * Fullmove number
     */
    if (typeof this.fullmoveNumber === "number") {
      return {
        kind: "fullmove-number",
        value: this.fullmoveNumber,
      };
    }

    throw new VError(
      `Cannot create Node from WipNode, ${JSON.stringify({ ...this }, null, 2)}`
    );
  }
}

export const parse = (input: Token[]): RootNode => {
  const result: RootNode = {
    kind: "ast",
    children: [],
  };

  let cursor = 0;

  let state: ParseState = ParseState.Ranks as ParseState;
  let wipNode = new WipNode();
  let rank: Rank = 8;

  const node = (node: Node) => {
    result.children.push(node);
    cursor++;
  };

  const completeWipNode = () => {
    result.children.push(wipNode.toNode());
    wipNode = new WipNode();
  };

  const setState = (newState: ParseState) => {
    state = newState;
    cursor++;
  };

  while (cursor < input.length) {
    const current = input[cursor];
    const next = input[cursor + 1];

    if (state === ParseState.Ranks) {
      if (
        (current.kind === "char" ||
          current.kind === "number" ||
          current.kind === "separator" ||
          current.kind === "space") &&
        wipNode.pieceDataReady()
      ) {
        completeWipNode();
      }

      if (current.kind === "char" && isLowerPiece(current.value)) {
        wipNode.setPieceSide("black");
        wipNode.setPiece(current.value);
        if (!next) completeWipNode();

        cursor++;
        continue;
      }

      if (current.kind === "char" && isPiece(current.value)) {
        wipNode.setPieceSide("white");
        wipNode.setPiece(current.value);
        if (!next) completeWipNode();

        cursor++;
        continue;
      }

      if (current.kind === "char" && current.value === "p") {
        wipNode.setPieceSide("black");
        wipNode.setPiece(null);
        if (!next) completeWipNode();

        cursor++;
        continue;
      }

      if (current.kind === "char" && current.value === "P") {
        wipNode.setPieceSide("white");
        wipNode.setPiece(null);
        if (!next) completeWipNode();

        cursor++;
        continue;
      }

      if (current.kind === "allegiance") {
        wipNode.addAllegianceMark();
        cursor++;
        continue;
      }

      if (
        current.kind === "number" &&
        current.value > 0 &&
        current.value <= 8
      ) {
        node({ kind: "skip", value: current.value });
        continue;
      }
    }

    switch (state) {
      case ParseState.Ranks: {
        if (current.kind === "separator") {
          rank--;
          cursor++;
          continue;
        }

        if (current.kind === "space") {
          state = ParseState.ActiveColour;
          cursor++;
          continue;
        }

        break;
      }

      /**
       * Active colour
       */
      case ParseState.ActiveColour: {
        if (current.kind === "char" && current.value === "w") {
          wipNode.setActiveColour("white");
          cursor++;
          continue;
        }

        if (current.kind === "char" && current.value === "b") {
          wipNode.setActiveColour("black");
          cursor++;
          continue;
        }

        if (current.kind === "space") {
          completeWipNode();
          setState(ParseState.CastlingRights);
          continue;
        }

        break;
      }

      /**
       * Castling rights
       */
      case ParseState.CastlingRights: {
        if (
          current.kind === "char" &&
          (current.value === "q" ||
            current.value === "Q" ||
            current.value === "k" ||
            current.value === "K")
        ) {
          wipNode.addCastlingRight(current.value);
          cursor++;
          continue;
        }

        // Means noone can castle
        if (current.kind === "hyphen") {
          cursor++;
          continue;
        }

        if (current.kind === "space") {
          if (wipNode.hasCastlingRights()) completeWipNode();

          setState(ParseState.EnPassantTargets);
          continue;
        }

        break;
      }

      /**
       * En passant targets
       */
      case ParseState.EnPassantTargets: {
        // Means there are no en passant targets
        if (current.kind === "hyphen") {
          cursor++;
          continue;
        }

        if (current.kind === "char" && isFile(current.value)) {
          wipNode.setEnPassantFile(letterToFile(current.value));
          cursor++;
          continue;
        }

        if (current.kind === "number" && isRank(current.value)) {
          wipNode.setEnPassantRank(current.value);
          cursor++;
          continue;
        }

        if (current.kind === "space") {
          if (wipNode.isEnPassantType()) completeWipNode();

          setState(ParseState.HalfmoveClock);
          continue;
        }

        break;
      }

      /**
       * Halfmove clock
       */
      case ParseState.HalfmoveClock: {
        if (current.kind === "number") {
          wipNode.setHalfmoveClock(current.value);
          cursor++;
          continue;
        }

        if (current.kind === "space") {
          completeWipNode();
          setState(ParseState.FullmoveNumber);
          continue;
        }

        break;
      }

      /**
       * Fullmove number
       */
      case ParseState.FullmoveNumber: {
        if (current.kind === "number") {
          wipNode.setFullmoveNumber(current.value);
          cursor++;
          completeWipNode();
        }

        continue;
      }
    }

    throw new VError(
      `Unhandled token: ${current.kind}, cursor ${cursor}, state: ${ParseState[state]}`
    );
  }

  return result;
};
