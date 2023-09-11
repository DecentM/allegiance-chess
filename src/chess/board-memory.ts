import { VError } from "verror";
import { File, Piece, Rank } from "../notation/declarations";
import { Coordinates } from "../notation/parser";

import { PieceAllegiance } from "./board";

export type BoardSquare = {
  piece: Piece | null;
  allegiance: PieceAllegiance;
};

// memory[file][rank] = BoardSquare
type Memory = (BoardSquare | null)[][];

type StandaloneBoardSquare = BoardSquare & Coordinates;

export class BoardMemory {
  private memory: Memory = [];

  public activeColour: "black" | "white" = "white";

  public enPassantTarget: Coordinates | null = null;

  private unmovedPiecesForCastling: Coordinates[] = [
    { file: 1, rank: 1 },
    { file: 8, rank: 1 },
    { file: 5, rank: 1 },
    { file: 1, rank: 8 },
    { file: 8, rank: 8 },
    { file: 5, rank: 8 },
  ];

  public removeCastlingRights(coords: Coordinates) {
    const index = this.unmovedPiecesForCastling.findIndex(
      (possibleCoords) =>
        possibleCoords.file === coords.file &&
        possibleCoords.rank === coords.rank
    );

    if (index === -1) {
      throw new VError(
        `Cannot remove castlight rights from ${coords.file}:${coords.rank}, because that square has none`
      );
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

  public setup() {
    // White pieces

    this.memory[0][0] = {
      allegiance: PieceAllegiance.White,
      piece: "R",
    };

    this.memory[1][0] = {
      allegiance: PieceAllegiance.White,
      piece: "N",
    };

    this.memory[2][0] = {
      allegiance: PieceAllegiance.White,
      piece: "B",
    };

    this.memory[3][0] = {
      allegiance: PieceAllegiance.White,
      piece: "Q",
    };

    this.memory[4][0] = {
      allegiance: PieceAllegiance.White,
      piece: "K",
    };

    this.memory[5][0] = {
      allegiance: PieceAllegiance.White,
      piece: "B",
    };

    this.memory[6][0] = {
      allegiance: PieceAllegiance.White,
      piece: "N",
    };

    this.memory[7][0] = {
      allegiance: PieceAllegiance.White,
      piece: "R",
    };

    // White pawns

    this.memory[0][1] = {
      allegiance: PieceAllegiance.White,
      piece: null,
    };

    this.memory[1][1] = {
      allegiance: PieceAllegiance.White,
      piece: null,
    };

    this.memory[2][1] = {
      allegiance: PieceAllegiance.White,
      piece: null,
    };

    this.memory[3][1] = {
      allegiance: PieceAllegiance.White,
      piece: null,
    };

    this.memory[4][1] = {
      allegiance: PieceAllegiance.White,
      piece: null,
    };

    this.memory[5][1] = {
      allegiance: PieceAllegiance.White,
      piece: null,
    };

    this.memory[6][1] = {
      allegiance: PieceAllegiance.White,
      piece: null,
    };

    this.memory[7][1] = {
      allegiance: PieceAllegiance.White,
      piece: null,
    };

    // Black pawns

    this.memory[0][6] = {
      allegiance: PieceAllegiance.Black,
      piece: null,
    };

    this.memory[1][6] = {
      allegiance: PieceAllegiance.Black,
      piece: null,
    };

    this.memory[2][6] = {
      allegiance: PieceAllegiance.Black,
      piece: null,
    };

    this.memory[3][6] = {
      allegiance: PieceAllegiance.Black,
      piece: null,
    };

    this.memory[4][6] = {
      allegiance: PieceAllegiance.Black,
      piece: null,
    };

    this.memory[5][6] = {
      allegiance: PieceAllegiance.Black,
      piece: null,
    };

    this.memory[6][6] = {
      allegiance: PieceAllegiance.Black,
      piece: null,
    };

    this.memory[7][6] = {
      allegiance: PieceAllegiance.Black,
      piece: null,
    };

    // Black pieces

    this.memory[0][7] = {
      allegiance: PieceAllegiance.Black,
      piece: "R",
    };

    this.memory[1][7] = {
      allegiance: PieceAllegiance.Black,
      piece: "N",
    };

    this.memory[2][7] = {
      allegiance: PieceAllegiance.Black,
      piece: "B",
    };

    this.memory[3][7] = {
      allegiance: PieceAllegiance.Black,
      piece: "Q",
    };

    this.memory[4][7] = {
      allegiance: PieceAllegiance.Black,
      piece: "K",
    };

    this.memory[5][7] = {
      allegiance: PieceAllegiance.Black,
      piece: "B",
    };

    this.memory[6][7] = {
      allegiance: PieceAllegiance.Black,
      piece: "N",
    };

    this.memory[7][7] = {
      allegiance: PieceAllegiance.Black,
      piece: "R",
    };
  }
}
