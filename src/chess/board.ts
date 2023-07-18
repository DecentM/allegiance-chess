import VError from "verror";

import { Column, Piece, Rank } from "../notation/declarations";
import { Coordinates, Node } from "../notation/parser";
import { Vector2 } from "../lib/vector2";

export const PieceAllegiance = {
  Black: 0,
  DarkGrey: 1,
  LightGrey: 2,
  White: 3,
} as const;

export type PieceAllegiance =
  (typeof PieceAllegiance)[keyof typeof PieceAllegiance];

type BoardSquare = {
  piece: Piece | null;
  allegiance: PieceAllegiance;
};

type StandaloneBoardSquare = BoardSquare & Coordinates;

type BoardMemory = Partial<Record<Rank, Partial<Record<Column, BoardSquare>>>>;

export class Board {
  private memory: BoardMemory = {};

  private moveHistory: Node[] = [];

  public setup = () => {
    this.memory = {
      "1": {
        a: {
          allegiance: PieceAllegiance.White,
          piece: "R",
        },
        b: {
          allegiance: PieceAllegiance.White,
          piece: "N",
        },
        c: {
          allegiance: PieceAllegiance.White,
          piece: "B",
        },
        d: {
          allegiance: PieceAllegiance.White,
          piece: "Q",
        },
        e: {
          allegiance: PieceAllegiance.White,
          piece: "K",
        },
        f: {
          allegiance: PieceAllegiance.White,
          piece: "B",
        },
        g: {
          allegiance: PieceAllegiance.White,
          piece: "N",
        },
        h: {
          allegiance: PieceAllegiance.White,
          piece: "R",
        },
      },
      "2": {
        a: {
          allegiance: PieceAllegiance.White,
          piece: null,
        },
        b: {
          allegiance: PieceAllegiance.White,
          piece: null,
        },
        c: {
          allegiance: PieceAllegiance.White,
          piece: null,
        },
        d: {
          allegiance: PieceAllegiance.White,
          piece: null,
        },
        e: {
          allegiance: PieceAllegiance.White,
          piece: null,
        },
        f: {
          allegiance: PieceAllegiance.White,
          piece: null,
        },
        g: {
          allegiance: PieceAllegiance.White,
          piece: null,
        },
        h: {
          allegiance: PieceAllegiance.White,
          piece: null,
        },
      },
      "7": {
        a: {
          allegiance: PieceAllegiance.Black,
          piece: null,
        },
        b: {
          allegiance: PieceAllegiance.Black,
          piece: null,
        },
        c: {
          allegiance: PieceAllegiance.Black,
          piece: null,
        },
        d: {
          allegiance: PieceAllegiance.Black,
          piece: null,
        },
        e: {
          allegiance: PieceAllegiance.Black,
          piece: null,
        },
        f: {
          allegiance: PieceAllegiance.Black,
          piece: null,
        },
        g: {
          allegiance: PieceAllegiance.Black,
          piece: null,
        },
        h: {
          allegiance: PieceAllegiance.Black,
          piece: null,
        },
      },
      "8": {
        a: {
          allegiance: PieceAllegiance.Black,
          piece: "R",
        },
        b: {
          allegiance: PieceAllegiance.Black,
          piece: "N",
        },
        c: {
          allegiance: PieceAllegiance.Black,
          piece: "B",
        },
        d: {
          allegiance: PieceAllegiance.Black,
          piece: "Q",
        },
        e: {
          allegiance: PieceAllegiance.Black,
          piece: "K",
        },
        f: {
          allegiance: PieceAllegiance.Black,
          piece: "B",
        },
        g: {
          allegiance: PieceAllegiance.Black,
          piece: "N",
        },
        h: {
          allegiance: PieceAllegiance.Black,
          piece: "R",
        },
      },
    };
  };

  private getSquares(): StandaloneBoardSquare[] {
    const result: StandaloneBoardSquare[] = [];

    Object.entries(this.memory).forEach(([rank, row]) => {
      Object.entries(row).forEach(([column, square]) => {
        result.push({
          allegiance: square.allegiance,
          piece: square.piece,
          column: column as Column,
          rank: rank as Rank,
        });
      });
    });

    return result;
  }

  private hasCastled(side: "black" | "white") {
    return this.moveHistory.some((node) => {
      if (node.kind !== "move") {
        return false;
      }

      const rank: Rank = side === "white" ? "1" : "8";

      return node.type === "castle" && node.from?.rank === rank;
    });
  }

  private trace(coords: Coordinates, direction: Vector2) {
    // TODO
  }

  private getValidMoves(): Node[] {
    const result: Node[] = [];
    const squares = this.getSquares();

    squares.forEach((square) => {
      // TODO: switch (square.piece) and implement movement rules with trace
    });

    return result;
  }
}
