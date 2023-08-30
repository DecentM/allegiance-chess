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

type BoardMove = {
  from: Coordinates;
  to: Coordinates;
  takes: Coordinates | null;
};

type BoardMoveHistoryItem = BoardMove & {
  piece: Piece | null;
  allegiance: PieceAllegiance;
};

export class Board {
  private moveHistory: BoardMoveHistoryItem[] = [];

  private memory: BoardMemory;

  constructor() {
    this.memory = new BoardMemory();

    this.memory.setup();
  }

  /* private hasCastled(side: "black" | "white") {
    return this.moveHistory.some((node) => {
      if (node.kind !== "move") {
        return false;
      }

      const rank: Rank = side === "white" ? 1 : 8;

      return node.type === "castle" && node.from?.rank === rank;
    });
  } */

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

  public getValidMoves(): BoardMove[] {
    const result: BoardMove[] = [];
    const squares = this.memory.getSquares();

    squares.forEach((square) => {
      // No piece on square
      if (!square) {
        return;
      }

      const side = allegianceSide(square.allegiance);

      /**
       * PAWN
       */
      if (square.piece === null) {
        const inFront = this.getCoordsRelative(
          square,
          new Vector2(0, side === "white" ? 1 : -1)
        );

        const diagLeft = this.getCoordsRelative(
          square,
          new Vector2(side === "white" ? -1 : 1, side === "white" ? 1 : -1)
        );

        const diagRight = this.getCoordsRelative(
          square,
          new Vector2(side === "white" ? 1 : -1, side === "white" ? 1 : -1)
        );

        // En passant
        const lastMove = this.moveHistory[this.moveHistory.length - 1];

        if (lastMove) {
          const lastMoveSide = allegianceSide(lastMove.allegiance);
          const lastMoveIsPawnJump =
            lastMove.piece === null &&
            Math.abs(lastMove.to.rank - lastMove.from.rank) === 2;

          if (
            lastMoveSide !== allegianceSide(square.allegiance) &&
            lastMoveIsPawnJump &&
            square.rank === lastMove.to.rank &&
            Math.abs(square.file - lastMove.to.file) === 1
          ) {
            result.push({
              from: square,
              takes: lastMove.to,
              to: this.getCoordsRelative(
                square,
                new Vector2(
                  // TODO: Is this the correct direction?
                  Math.sign(square.file - lastMove.to.file),
                  side === "white" ? 1 : -1
                )
              ),
            });
          }
        }

        if (inFront && !this.memory.getSquare(inFront)) {
          result.push({
            from: square,
            to: inFront,
            takes: null,
          });
        }

        if (diagLeft && this.memory.getSquare(diagLeft)) {
          result.push({
            from: square,
            to: diagLeft,
            takes: diagLeft,
          });
        }

        if (diagRight && this.memory.getSquare(diagRight)) {
          result.push({
            from: square,
            to: diagRight,
            takes: diagRight,
          });
        }

        // TODO: Scan for promotions and self-checks after all steps are
        // calculated

        // Starting jump
        if (
          (square.rank === 2 && side === "white") ||
          (square.rank === 7 && side === "black")
        ) {
          const inFront2 = this.getCoordsRelative(
            square,
            new Vector2(0, side === "white" ? 2 : -2)
          );

          if (
            !this.memory.getSquare(inFront) &&
            !this.memory.getSquare(inFront2)
          ) {
            result.push({
              from: square,
              to: inFront2,
              takes: null,
            });
          }
        }
      }

      /**
       * ROOK
       */
      if (square.piece === "R") {
        const steps: Coordinates[] = [
          // X pos
          ...this.traceCaptureSteps(square, new Vector2(1, 0)),
          // X neg
          ...this.traceCaptureSteps(square, new Vector2(-1, 0)),
          // Y pos
          ...this.traceCaptureSteps(square, new Vector2(0, 1)),
          // Y neg
          ...this.traceCaptureSteps(square, new Vector2(0, -1)),
        ];

        result.push(
          ...steps.map((step) => ({
            from: square,
            to: step,
            takes: this.memory.getSquare(step) ? step : null,
          }))
        );
      }

      /**
       * KNIGHT
       */
      if (square.piece === "N") {
        const targets = [
          this.getCoordsRelative(square, new Vector2(1, 2)),
          this.getCoordsRelative(square, new Vector2(2, 1)),
          this.getCoordsRelative(square, new Vector2(2, -1)),
          this.getCoordsRelative(square, new Vector2(1, -2)),
          this.getCoordsRelative(square, new Vector2(-1, -2)),
          this.getCoordsRelative(square, new Vector2(-2, -1)),
          this.getCoordsRelative(square, new Vector2(-2, 1)),
          this.getCoordsRelative(square, new Vector2(-1, 2)),
        ].filter(Boolean);

        targets.forEach((target) => {
          const targetSquare = this.memory.getSquare(target);

          if (
            targetSquare &&
            allegianceSide(targetSquare.allegiance) === side
          ) {
            return;
          }

          result.push({
            from: square,
            to: target,
            takes: targetSquare ? target : null,
          });
        });
      }

      /**
       * BISHOP
       */
      if (square.piece === "B") {
        const steps: Coordinates[] = [
          // NE
          ...this.traceCaptureSteps(square, new Vector2(1, 1)),
          // SE
          ...this.traceCaptureSteps(square, new Vector2(1, -1)),
          // SW
          ...this.traceCaptureSteps(square, new Vector2(-1, -1)),
          // NW
          ...this.traceCaptureSteps(square, new Vector2(-1, 1)),
        ];

        result.push(
          ...steps.map((step) => ({
            from: square,
            to: step,
            takes: this.memory.getSquare(step) ? step : null,
          }))
        );
      }

      /**
       * QUEEN
       */
      if (square.piece === "Q") {
        const steps: Coordinates[] = [
          // X pos
          ...this.traceCaptureSteps(square, new Vector2(1, 0)),
          // X neg
          ...this.traceCaptureSteps(square, new Vector2(-1, 0)),
          // Y pos
          ...this.traceCaptureSteps(square, new Vector2(0, 1)),
          // Y neg
          ...this.traceCaptureSteps(square, new Vector2(0, -1)),
          // NE
          ...this.traceCaptureSteps(square, new Vector2(1, 1)),
          // SE
          ...this.traceCaptureSteps(square, new Vector2(1, -1)),
          // SW
          ...this.traceCaptureSteps(square, new Vector2(-1, -1)),
          // NW
          ...this.traceCaptureSteps(square, new Vector2(-1, 1)),
        ];

        result.push(
          ...steps.map((step) => ({
            from: square,
            to: step,
            takes: this.memory.getSquare(step) ? step : null,
          }))
        );
      }

      /**
       * KING
       */
      // TODO: Castling
      if (square.piece === "K") {
        const possibleMoves: Coordinates[] = [
          this.getCoordsRelative(square, new Vector2(0, 1)),
          this.getCoordsRelative(square, new Vector2(1, 1)),
          this.getCoordsRelative(square, new Vector2(1, 0)),
          this.getCoordsRelative(square, new Vector2(1, -1)),
          this.getCoordsRelative(square, new Vector2(0, -1)),
          this.getCoordsRelative(square, new Vector2(-1, -1)),
          this.getCoordsRelative(square, new Vector2(-1, 0)),
          this.getCoordsRelative(square, new Vector2(-1, 1)),
        ].filter(Boolean);

        possibleMoves.forEach((possibleMove) => {
          const toSquare = this.memory.getSquare(possibleMove);

          if (toSquare && allegianceSide(toSquare.allegiance) === side) {
            return;
          }

          result.push({
            from: square,
            to: possibleMove,
            takes: toSquare ? { ...possibleMove, ...toSquare } : null,
          });
        });
      }
    });

    return result;
  }
}
