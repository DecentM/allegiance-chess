import VError from "verror";

import { Rank } from "../notation/declarations";
import {
  AllegianceNode,
  AnyMoveNode,
  CaptureNode,
  CastleNode,
  CastleSide,
  Coordinates,
  DefaultNode,
  EnPassantNode,
  MoveNode,
  Node,
  PromotionNode,
} from "../notation/parser";
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
  implies: null | {
    from: Coordinates;
    to: Coordinates;
  };
};

type ExecuteMoveTypeInput<NodeType extends MoveNode<string | void>> = {
  node: NodeType;
  from: BoardSquare;
  to: BoardSquare;
  fromSide: "white" | "black";
  toSide: "white" | "black";
};

export class Board {
  private moveHistory: ExecuteMoveTypeInput<AnyMoveNode>[] = [];

  private memory: BoardMemory;

  constructor() {
    this.memory = new BoardMemory();

    this.memory.setup();
  }

  /**
   * @internal
   * TODO: Remove this when implementing FEN import/export
   */
  public dump() {
    return this.memory.getSquares();
  }

  private executeAllegianceMoveNode(
    input: ExecuteMoveTypeInput<AllegianceNode>
  ) {
    this.memory.setSquare(input.node.to, {
      allegiance: (input.fromSide === "white"
        ? input.to.allegiance + 1
        : input.to.allegiance - 1) as PieceAllegiance,
      piece: input.to.piece,
    });
  }

  private executeCaptureMoveNode(input: ExecuteMoveTypeInput<CaptureNode>) {
    this.memory.setSquare(input.node.to, input.from);
    this.memory.setSquare(input.node.from, null);
  }

  private executeCastleMoveNode(input: ExecuteMoveTypeInput<CastleNode>) {
    const rank: Rank = input.fromSide === "white" ? 1 : 8;
    const rookCoords: Coordinates =
      input.node.side === "king" ? { file: 8, rank } : { file: 1, rank };

    const king = input.from;
    const rook = this.memory.getSquare(rookCoords);

    const kingToCoords: Coordinates =
      input.node.side === "king" ? { file: 7, rank } : { file: 3, rank };

    const rookToCoords: Coordinates =
      input.node.side === "king" ? { file: 6, rank } : { file: 4, rank };

    this.memory.setSquare(kingToCoords, king);
    this.memory.setSquare(rookToCoords, rook);
    this.memory.setSquare(rookCoords, null);
    this.memory.setSquare(input.node.from, null);
  }

  private executeEnPassantMoveNode(input: ExecuteMoveTypeInput<EnPassantNode>) {
    const targetFile = input.node.to.file;

    this.memory.setSquare(
      {
        rank: (input.fromSide === "white"
          ? input.node.from.rank + 1
          : input.node.from.rank - 1) as Rank,
        file: targetFile,
      },
      input.from
    );
    this.memory.setSquare(input.node.to, null);
    this.memory.setSquare(input.node.from, null);
  }

  private executePromotionMoveNode(input: ExecuteMoveTypeInput<PromotionNode>) {
    this.memory.setSquare(input.node.to, {
      allegiance: input.from.allegiance,
      piece: input.node.promotionTo,
    });
    this.memory.setSquare(input.node.from, null);
  }

  private executeDefaultMoveNode(input: ExecuteMoveTypeInput<DefaultNode>) {
    this.memory.setSquare(input.node.from, null);
    this.memory.setSquare(input.node.to, input.from);
  }

  private executeMoveNode(node: AnyMoveNode) {
    // TODO: Validate moves before executing them

    const from = this.memory.getSquare(node.from);
    const to = this.memory.getSquare(node.to);
    const fromSide = allegianceSide(from.allegiance);
    const toSide = to ? allegianceSide(to.allegiance) : null;

    /* if (to && node.type !== "capture" && node.type !== "allegiance") {
      throw new VError(
        `Cannot step from ${node.from.file}:${node.from.rank} to ${node.to.file}:${node.to.rank}, because it would be a capture or allegiance`
      );
    } */
    // TODO: Non-capture and non-allegiance nodes should check if their targets
    // TODO  are empty

    switch (node.type) {
      case "allegiance":
        this.executeAllegianceMoveNode({
          from,
          to,
          fromSide,
          toSide,
          node,
        });
        break;

      case "capture":
        this.executeCaptureMoveNode({
          from,
          to,
          fromSide,
          toSide,
          node,
        });
        break;

      case "castle":
        this.executeCastleMoveNode({
          from,
          to,
          fromSide,
          toSide,
          node,
        });
        break;

      case "en-passant":
        this.executeEnPassantMoveNode({
          from,
          to,
          fromSide,
          toSide,
          node,
        });
        break;

      case "promotion":
        this.executePromotionMoveNode({
          from,
          to,
          fromSide,
          toSide,
          node,
        });
        break;

      default:
        this.executeDefaultMoveNode({
          from,
          to,
          fromSide,
          toSide,
          node,
        });
        break;
    }

    this.moveHistory.push({
      from,
      to,
      fromSide,
      toSide,
      node,
    });
  }

  private executeNode(node: Node) {
    switch (node.kind) {
      case "move": {
        this.executeMoveNode(node);

        break;
      }
    }
  }

  public execute(nodes: Node[]) {
    nodes.forEach((node) => {
      this.executeNode(node);
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

  /* private castlingEligibility(side: "white" | "black"): CastleSide[] {
    const ownMoves = this.moveHistory.filter((move) => move.fromSide === side);

    const queenSideRookMoves = ownMoves.filter((move) => {
      return move.from.piece === "R" && move.node.from.file === 1;
    });

    const kingSideRookMoves = ownMoves.filter((move) => {
      return move.from.piece === "R" && move.node.from.file === 8;
    });

    const kingMoves = ownMoves.filter((move) => {
      return move.from.piece === "K";
    });

    const result: CastleSide[] = [];

    if (queenSideRookMoves.length === 0 && kingMoves.length === 0) {
      const fileB = this.memory.getSquare({
        file: 2,
        rank: side === "white" ? 1 : 8,
      });
      const fileC = this.memory.getSquare({
        file: 3,
        rank: side === "white" ? 1 : 8,
      });
      const fileD = this.memory.getSquare({
        file: 4,
        rank: side === "white" ? 1 : 8,
      });

      if (!fileB && !fileC && !fileD) {
        result.push("queen");
      }
    }

    if (kingSideRookMoves.length === 0 && kingMoves.length === 0) {
      const fileF = this.memory.getSquare({
        file: 6,
        rank: side === "white" ? 1 : 8,
      });
      const fileG = this.memory.getSquare({
        file: 7,
        rank: side === "white" ? 1 : 8,
      });

      if (!fileF && !fileG) {
        result.push("king");
      }
    }

    return result;
  } */

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
          const lastMoveSide = lastMove.fromSide;
          const lastMoveIsPawnJump =
            lastMove.from.piece === null &&
            Math.abs(lastMove.node.to.rank - lastMove.node.from.rank) === 2;

          if (
            lastMoveSide !== allegianceSide(square.allegiance) &&
            lastMoveIsPawnJump &&
            square.rank === lastMove.node.to.rank &&
            Math.abs(square.file - lastMove.node.to.file) === 1
          ) {
            result.push({
              from: square,
              takes: lastMove.node.to,
              implies: null,
              to: this.getCoordsRelative(
                square,
                new Vector2(
                  // TODO: Is this the correct direction?
                  Math.sign(square.file - lastMove.node.to.file),
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
            implies: null,
          });
        }

        if (diagLeft && this.memory.getSquare(diagLeft)) {
          result.push({
            from: square,
            to: diagLeft,
            takes: diagLeft,
            implies: null,
          });
        }

        if (diagRight && this.memory.getSquare(diagRight)) {
          result.push({
            from: square,
            to: diagRight,
            takes: diagRight,
            implies: null,
          });
        }

        // TODO: Scan for promotions and self-checks after all steps are
        // TODO  calculated

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
              implies: null,
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
            implies: null,
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
            implies: null,
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
            implies: null,
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
            implies: null,
          }))
        );
      }

      /**
       * KING
       */
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
            implies: null,
          });
        });

        const whiteCastling = this.castlingEligibility("white");

        whiteCastling.forEach((castling) => {
          if (castling === "king") {
            result.push({
              from: square,
              to: this.getCoordsRelative(square, new Vector2(2, 0)),
              takes: null,
              implies: {
                from: {
                  file: 8,
                  rank: 1,
                },
                to: {
                  file: 6,
                  rank: 1,
                },
              },
            });
          }

          if (castling === "queen") {
            result.push({
              from: square,
              to: this.getCoordsRelative(square, new Vector2(-2, 0)),
              takes: null,
              implies: {
                from: {
                  file: 1,
                  rank: 1,
                },
                to: {
                  file: 4,
                  rank: 1,
                },
              },
            });
          }
        });

        const blackCastling = this.castlingEligibility("black");

        blackCastling.forEach((castling) => {
          if (castling === "king") {
            result.push({
              from: square,
              to: this.getCoordsRelative(square, new Vector2(2, 0)),
              takes: null,
              implies: {
                from: {
                  file: 8,
                  rank: 8,
                },
                to: {
                  file: 6,
                  rank: 8,
                },
              },
            });
          }

          if (castling === "queen") {
            result.push({
              from: square,
              to: this.getCoordsRelative(square, new Vector2(-2, 0)),
              takes: null,
              implies: {
                from: {
                  file: 1,
                  rank: 8,
                },
                to: {
                  file: 4,
                  rank: 8,
                },
              },
            });
          }
        });
      }
    });

    return result;
  }
}
