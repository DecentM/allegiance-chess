import VError from "verror";

import { File, Piece, Rank } from "../notation/declarations";
import { Coordinates, Node } from "../notation/parser";
import { Vector2 } from "../lib/vector2";
import { BoardMemory, BoardSquare } from "./board-memory";

export const PieceAllegiance = {
  Black: 0,
  DarkGrey: 1,
  LightGrey: 2,
  White: 3,
} as const;

export type PieceAllegiance =
  (typeof PieceAllegiance)[keyof typeof PieceAllegiance];

const allegianceSide = (allegiance: PieceAllegiance): "white" | "black" => {
  return allegiance === PieceAllegiance.Black ||
    allegiance == PieceAllegiance.DarkGrey
    ? "black"
    : "white";
};

export class Board {
  private moveHistory: Node[] = [];

  private memory: BoardMemory;

  constructor() {
    this.memory = new BoardMemory();

    this.memory.setup();
  }

  private hasCastled(side: "black" | "white") {
    return this.moveHistory.some((node) => {
      if (node.kind !== "move") {
        return false;
      }

      const rank: Rank = side === "white" ? 1 : 8;

      return node.type === "castle" && node.from?.rank === rank;
    });
  }

  private getCoordsRelative(
    coords: Coordinates,
    direction: Vector2
  ): Coordinates {
    // Not typed as Coords because we don't know if it's valid yet
    const newCoords = {
      file: coords.file + direction.x,
      rank: coords.rank + direction.y,
    };

    if (newCoords.file > 8 || newCoords.file <= 0) {
      return null;
    }

    if (newCoords.rank > 8 || newCoords.rank <= 0) {
      return null;
    }

    return newCoords as Coordinates;
  }

  private getSquareRelative(
    coords: Coordinates,
    direction: Vector2
  ): BoardSquare | null {
    const newCoords = this.getCoordsRelative(coords, direction);

    if (!newCoords) {
      return null;
    }

    return this.memory.getSquare(newCoords);
  }

  public traceCaptureSteps(
    coords: Coordinates,
    direction: Vector2
  ): Coordinates[] {
    if (
      Math.abs(direction.x) !== Math.abs(direction.y) &&
      direction.x !== 0 &&
      direction.y !== 0
    ) {
      throw new VError("Cannot trace in a non-continuous direction");
    }

    const startSquare = this.memory.getSquare(coords);

    if (!startSquare) {
      // No captures can be made from a square with no piece on it
      return [];
    }

    const steps: Coordinates[] = [];
    const singleStepVector = new Vector2(
      Math.sign(direction.x),
      Math.sign(direction.y)
    );

    let currentCoords = coords;

    while (
      currentCoords.file !== coords.file + direction.x ||
      currentCoords.rank !== coords.rank + direction.y
    ) {
      currentCoords = this.getCoordsRelative(currentCoords, singleStepVector);

      if (!currentCoords) {
        break;
      }

      const currentSquare = this.memory.getSquare(currentCoords);

      if (!currentSquare) {
        steps.push({ ...currentCoords });
        continue;
      }

      if (
        // Cannot capture own piece
        allegianceSide(currentSquare.allegiance) ===
        allegianceSide(startSquare.allegiance)
      ) {
        break;
      }

      if (
        // Can capture enemy piece, but not beyond
        allegianceSide(currentSquare.allegiance) !==
        allegianceSide(startSquare.allegiance)
      ) {
        steps.push({ ...currentCoords });

        break;
      }

      steps.push({ ...currentCoords });
    }

    return steps;
  }

  public traceCapture(coords: Coordinates, direction: Vector2): Coordinates[] {
    const steps = this.traceCaptureSteps(coords, direction);

    return [];
  }

  private getValidMoves(side: "black" | "white"): Node[] {
    const result: Node[] = [];
    const squares = this.memory.getSquares();
    const sideSquares = squares.filter((square) => {
      return side === "white"
        ? square.allegiance >= PieceAllegiance.LightGrey
        : square.allegiance <= PieceAllegiance.DarkGrey;
    });

    sideSquares.forEach((square) => {
      // TODO: switch (square.piece) and implement movement rules with trace
    });

    return result;
  }
}
