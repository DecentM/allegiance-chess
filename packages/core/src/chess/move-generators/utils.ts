import { Vector2 } from '../../lib/vector2'
import { Board, Square } from '../board'
import * as Piece from '../piece'

export const DirectionIndex = {
  North: 0,
  NorthEast: 1,
  East: 2,
  SouthEast: 3,
  South: 4,
  SouthWest: 5,
  West: 6,
  NorthWest: 7,
} as const

export type DirectionIndex =
  (typeof DirectionIndex)[keyof typeof DirectionIndex]

type Octuple = [number, number, number, number, number, number, number, number]

export enum MoveFlag {
  None = 0b0000,
  IsCapture = 0b0001,
  IsEnPassant = 0b0010,
  IsPromotion = 0b0100,
  IsCastle = 0b1000,
}

export type Move = {
  from: number
  to: number

  flags: number

  promotion: null | Piece.Type

  undo: null | {
    captures: {
      index: number
      square: Square
    }
  }
}

export class MoveGeneratorUtilities {
  protected static generateDistanceLookup(width: number, height: number) {
    // n, ne, e, se, s, sw, w, nw
    const result: Octuple[] = []

    for (let rank = 0; rank < height; rank++) {
      for (let file = 0; file < width; file++) {
        const north = height - 1 - rank
        const east = width - 1 - file
        const south = rank
        const west = file

        const item: Octuple = [
          north,
          Math.min(north, east),
          east,
          Math.min(south, east),
          south,
          Math.min(south, west),
          west,
          Math.min(north, west),
        ]

        result[rank * width + file] = item
      }
    }

    return result
  }

  protected static generateDirectionOffsets(width: number): Octuple {
    // n, ne, e, se, s, sw, w, nw
    return [width, width + 1, 1, -width + 1, -width, -width - 1, -1, width - 1]
  }

  protected distanceLookup: Octuple[]

  protected directionOffsets: Octuple

  constructor(public board: Board) {
    this.distanceLookup = MoveGeneratorUtilities.generateDistanceLookup(
      board.options.width,
      board.options.height
    )

    this.directionOffsets = MoveGeneratorUtilities.generateDirectionOffsets(
      board.options.width
    )
  }

  protected getDistanceToEdge(index: number, direction: DirectionIndex) {
    return this.distanceLookup[index][direction]
  }

  public generateSlidingAttackedIndexes(
    fromIndex: number,
    fromSquare: Square,
    direction: DirectionIndex
  ): number[] {
    const result: number[] = []
    const fromSide = Board.getColour(Board.getAllegiance(fromSquare))

    for (let i = 0; i < this.distanceLookup[fromIndex][direction]; i++) {
      const targetIndex = fromIndex + this.directionOffsets[direction] * (i + 1)
      const targetPiece = this.board.getSquare(targetIndex)
      const targetSide = Board.getColour(Board.getAllegiance(targetPiece))

      if (targetPiece && targetSide === fromSide) {
        break
      }

      result.push(targetIndex)

      if (targetPiece) {
        break
      }
    }

    return result
  }

  public generateMove(
    fromIndex: number,
    toIndex: number,
    toSquare: Square
  ): Move {
    return {
      from: fromIndex,
      to: toIndex,
      flags: toSquare ? MoveFlag.IsCapture : MoveFlag.None,
      promotion: null,
      undo: toSquare
        ? { captures: { index: toIndex, square: toSquare } }
        : null,
    }
  }

  public getIndexRelative(fromIndex: number, offset: Vector2) {
    const yDirectionOffsetIndex =
      offset.y < 0 ? DirectionIndex.South : DirectionIndex.North
    const xDirectionOffsetIndex =
      offset.x < 0 ? DirectionIndex.West : DirectionIndex.East

    if (
      this.distanceLookup[fromIndex][yDirectionOffsetIndex] < Math.abs(offset.y)
    ) {
      return -1
    }

    if (
      this.distanceLookup[fromIndex][xDirectionOffsetIndex] < Math.abs(offset.x)
    ) {
      return -1
    }

    const yOffset =
      this.directionOffsets[yDirectionOffsetIndex] * Math.abs(offset.y)
    const xOffset =
      this.directionOffsets[xDirectionOffsetIndex] * Math.abs(offset.x)

    return fromIndex + yOffset + xOffset
  }

  public generateIndexWithOffset(
    fromIndex: number,
    fromSquare: Square,
    offset: Vector2
  ): number {
    const targetIndex = this.getIndexRelative(fromIndex, offset)

    if (targetIndex === -1) {
      return -1
    }

    const targetPiece = this.board.getSquare(targetIndex)

    if (targetPiece) {
      const targetSide = Board.getColour(Board.getAllegiance(targetPiece))
      const fromSide = Board.getColour(Board.getAllegiance(fromSquare))

      if (targetSide === fromSide) {
        return -1
      }
    }

    return targetIndex
  }
}
