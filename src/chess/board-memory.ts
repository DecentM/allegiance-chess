import { VError } from "verror";
import cloneDeep from "lodash.clonedeep";

import { File, Piece, Rank } from "../notation/declarations";
import { Coordinates } from "../notation/parser";

import { PieceAllegiance } from "./board";
import { tokenize } from "../afen/tokenizer";
import { parse } from "../afen/parser";
import { fileToLetter } from "../lib/notation";
import { allegianceSide } from "../lib/allegiance";

export type BoardSquare = {
  piece: Piece | null;
  allegiance: PieceAllegiance;
};

// memory[file][rank] = BoardSquare
type Memory = (BoardSquare | null)[][];

type StandaloneBoardSquare = BoardSquare & Coordinates;

export class BoardMemory {
  private memory: Memory = [];

  public activeColour: "black" | "white";

  public enPassantTarget: Coordinates | null;

  private unmovedPiecesForCastling: Coordinates[];

  public halfmoveClock: number;

  public fullmoveNumber: number;

  public clone() {
    const memory = new BoardMemory();

    memory.memory = cloneDeep(this.memory);
    memory.activeColour = this.activeColour;
    memory.enPassantTarget = cloneDeep(this.enPassantTarget);
    memory.unmovedPiecesForCastling = cloneDeep(this.unmovedPiecesForCastling);
    memory.halfmoveClock = this.halfmoveClock;
    memory.fullmoveNumber = this.fullmoveNumber;

    return memory;
  }

  public removeCastlingRights(coords: Coordinates) {
    const index = this.unmovedPiecesForCastling.findIndex(
      (possibleCoords) =>
        possibleCoords.file === coords.file &&
        possibleCoords.rank === coords.rank
    );

    if (index === -1) {
      return;
    }

    this.unmovedPiecesForCastling.splice(index);
  }

  public castlingRights(side: "white" | "black"): Array<"queen" | "king"> {
    const result: Array<"queen" | "king"> = [];
    const rank: Rank = side === "white" ? 1 : 8;

    const kingUnmoved = this.unmovedPiecesForCastling.some((coord) => {
      return coord.file === 5 && coord.rank === rank;
    });

    // If the king has been moved, no castling is possible
    if (!kingUnmoved) {
      return [];
    }

    const queenSideCastling = this.unmovedPiecesForCastling.find((coord) => {
      return coord.rank === rank && coord.file === 1;
    });

    const kingSideCastling = this.unmovedPiecesForCastling.find((coord) => {
      return coord.rank === rank && coord.file === 8;
    });

    if (queenSideCastling) {
      result.push("queen");
    }

    if (kingSideCastling) {
      result.push("king");
    }

    return result;
  }

  private clear() {
    this.memory = [];
    this.activeColour = "white";
    this.enPassantTarget = null;
    this.unmovedPiecesForCastling = [];
    this.halfmoveClock = 0;
    this.fullmoveNumber = 0;

    for (let file: number = 0; file < 8; file++) {
      this.memory[file] = [];

      for (let rank: number = 0; rank < 8; rank++) {
        this.memory[file][rank] = null;
      }
    }
  }

  constructor() {
    this.clear();
  }

  /**
   * @internal For debugging
   */
  public dump(): string {
    const squares = this.getSquares();

    const ranks = Array.from({ length: 8 }).map(() => {
      return Array.from({ length: 8 }).map(() => ".");
    });
    let result = "";

    squares.filter(Boolean).forEach((square) => {
      ranks[square.rank - 1][square.file - 1] =
        allegianceSide(square.allegiance) === "white"
          ? square.piece?.toUpperCase() ?? "P"
          : square.piece?.toLowerCase() ?? "p";
    });

    for (let i = 7; i >= 0; i--) {
      result += `${i + 1} `;
      result += ranks[i].map((item) => item).join(" ");
      result += "\n";
    }

    result += `  ${ranks[0]
      .map((_, fileIndex) => fileToLetter((fileIndex + 1) as File))
      .join(" ")}`;

    return result;
  }

  public getSquares(): StandaloneBoardSquare[] {
    const result: StandaloneBoardSquare[] = [];

    this.memory.forEach((ranks, file) => {
      ranks.forEach((square, rank) => {
        if (!square) {
          result.push(null);
          return;
        }

        result.push({
          allegiance: square.allegiance,
          piece: square.piece,
          file: (file + 1) as File,
          rank: (rank + 1) as Rank,
        });
      });
    });

    return result;
  }

  public getSquare(coords: Coordinates) {
    return this.memory[coords.file - 1][coords.rank - 1];
  }

  public setSquare(coords: Coordinates, square: BoardSquare | null) {
    this.memory[coords.file - 1][coords.rank - 1] = square;
  }

  public importAFEN(afen: string) {
    this.clear();

    const tokens = tokenize(afen);
    const ast = parse(tokens);

    let rank: Rank = 8;
    let file: File = 1;

    ast.children.forEach((node) => {
      if (file > 8) {
        rank--;
        file = 1;
      }

      if (node.kind === "piece") {
        this.setSquare({ file, rank }, node.value);
        file++;
        return;
      }

      if (node.kind === "skip") {
        file += node.value;
        return;
      }

      if (node.kind === "en-passant-targets") {
        this.enPassantTarget = node.value;
        return;
      }

      if (node.kind === "castling-rights") {
        if (node.value.black.length !== 0) {
          this.unmovedPiecesForCastling.push({
            file: 5,
            rank: 8,
          });
        }

        node.value.black.forEach((blackCastleSide) => {
          this.unmovedPiecesForCastling.push(
            blackCastleSide === "queen"
              ? {
                  file: 1,
                  rank: 8,
                }
              : {
                  file: 8,
                  rank: 8,
                }
          );
        });

        if (node.value.white.length !== 0) {
          this.unmovedPiecesForCastling.push({
            file: 5,
            rank: 1,
          });
        }

        node.value.white.forEach((whiteCastleSide) => {
          this.unmovedPiecesForCastling.push(
            whiteCastleSide === "queen"
              ? {
                  file: 1,
                  rank: 1,
                }
              : {
                  file: 8,
                  rank: 1,
                }
          );
        });

        return;
      }

      if (node.kind === "active-colour") {
        this.activeColour = node.value;
        return;
      }

      if (node.kind === "fullmove-number") {
        this.fullmoveNumber = node.value;
        return;
      }

      if (node.kind === "halfmove-clock") {
        this.halfmoveClock = node.value;
        return;
      }

      throw new VError(
        `Unhandled node while importing AFEN: ${
          node["kind"] ?? JSON.stringify(node, null, 2)
        }`
      );
    });
  }
}
