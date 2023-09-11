import VError from "verror";
import { Token, TokenKind } from "./tokenizer";
import { Piece } from "../notation/declarations";
import { PieceAllegiance } from "../chess/board";
import { CastleSide, Coordinates } from "../notation/parser";
import { isLowerPiece, isPiece } from "../lib/is-piece";

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
  Rank8,
  Rank7,
  Rank6,
  Rank5,
  Rank4,
  Rank3,
  Rank2,
  Rank1,
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

  private piece: Piece | Lowercase<Piece>;

  canSetPiece() {
    return !this.piece;
  }

  setPiece(piece: Piece | Lowercase<Piece>) {
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

  toNode(): Node {
    /**
     * PieceNode
     */
    if (this.piece) {
      if (this.pieceSide === "white") {
        return {
          kind: "piece",
          value: {
            allegiance: this.allegianceMark
              ? PieceAllegiance.LightGrey
              : PieceAllegiance.White,
            piece: this.piece.toUpperCase() as Piece,
          },
        };
      }

      return {
        kind: "piece",
        value: {
          allegiance: this.allegianceMark
            ? PieceAllegiance.DarkGrey
            : PieceAllegiance.Black,
          piece: this.piece.toUpperCase() as Piece,
        },
      };
    }
  }
}

const positionStates: ParseState[] = [
  ParseState.Rank1,
  ParseState.Rank2,
  ParseState.Rank3,
  ParseState.Rank4,
  ParseState.Rank5,
  ParseState.Rank6,
  ParseState.Rank7,
  ParseState.Rank8,
];

export const parse = (input: Token[]): RootNode => {
  const result: RootNode = {
    kind: "ast",
    children: [],
  };

  let cursor = 0;

  // FEN represents boards starting with A8
  let state: ParseState = ParseState.Rank8 as ParseState;
  let wipNode = new WipNode();

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

    if (positionStates.includes(state)) {
      if (current.kind === "char" && isLowerPiece(current.value)) {
        wipNode.setPieceSide("black");
        wipNode.setPiece(current.value);
        cursor++;
        break;
      }

      if (current.kind === "char" && isPiece(current.value)) {
        wipNode.setPieceSide("white");
        wipNode.setPiece(current.value);
        cursor++;
        break;
      }

      if (current.kind === "allegiance") {
        wipNode.addAllegianceMark();
        cursor++;
        break;
      }

      if (current.kind === "char" && wipNode.pieceDataReady()) {
        completeWipNode();
        break;
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
      /**
       * Rank 8
       */
      case ParseState.Rank8: {
        if (current.kind === "separator") {
          setState(ParseState.Rank7);
          break;
        }

        break;
      }

      /**
       * Rank 7
       */
      case ParseState.Rank7: {
        if (current.kind === "separator") {
          setState(ParseState.Rank6);
          break;
        }

        break;
      }

      /**
       * Rank 6
       */
      case ParseState.Rank6: {
        if (current.kind === "separator") {
          setState(ParseState.Rank5);
          break;
        }

        break;
      }

      /**
       * Rank 5
       */
      case ParseState.Rank5: {
        if (current.kind === "separator") {
          setState(ParseState.Rank4);
          break;
        }

        break;
      }

      /**
       * Rank 4
       */
      case ParseState.Rank4: {
        if (current.kind === "separator") {
          setState(ParseState.Rank3);
          break;
        }

        break;
      }

      /**
       * Rank 3
       */
      case ParseState.Rank3: {
        if (current.kind === "separator") {
          setState(ParseState.Rank3);
          break;
        }

        break;
      }

      /**
       * Rank 2
       */
      case ParseState.Rank2: {
        if (current.kind === "separator") {
          setState(ParseState.Rank1);
          break;
        }

        break;
      }

      /**
       * Rank 1
       */
      case ParseState.Rank1: {
        if (current.kind === "space") {
          setState(ParseState.ActiveColour);
          break;
        }

        break;
      }

      /**
       * Active colour
       */
      case ParseState.ActiveColour: {
        if (current.kind === "space") {
          setState(ParseState.CastlingRights);
          break;
        }

        break;
      }

      /**
       * Castling rights
       */
      case ParseState.CastlingRights: {
        if (current.kind === "space") {
          setState(ParseState.EnPassantTargets);
          break;
        }

        break;
      }

      /**
       * En passant targets
       */
      case ParseState.EnPassantTargets: {
        if (current.kind === "space") {
          setState(ParseState.HalfmoveClock);
          break;
        }

        break;
      }

      /**
       * Halfmove clock
       */
      case ParseState.HalfmoveClock: {
        if (current.kind === "space") {
          setState(ParseState.FullmoveNumber);
          break;
        }

        break;
      }

      /**
       * Fullmove number
       */
      case ParseState.FullmoveNumber: {
        // TODO: Handle parsing termination

        break;
      }
    }
  }

  return result;
};
