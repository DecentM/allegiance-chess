import { AfenIO } from './afen-io'
import { MoveExecutor } from './move-executor'
import { MoveGenerator } from './move-generator'
import * as Piece from './piece'

export type Square = Piece.Type | Piece.Allegiance | null

type BoardOptions = {
  width: number
  height: number
}

export enum Colour {
  Black = 0b0,
  White = 0b1,
}

export enum CastlingRight {
  None = 0b0000,
  BlackQueen = 0b0001,
  BlackKing = 0b0010,
  WhiteQueen = 0b0100,
  WhiteKing = 0b1000,
}

export class BoardMemoryAccess {
  constructor(
    public getMemory: () => number[],
    public setMemory: (newMemory: number[]) => void
  ) {}
}

export class Board {
  public halfmoveClock = 0

  public fullmoveNumber = 0

  public enPassantTarget = -1

  public activeColour = Colour.White

  private castlingRights = CastlingRight.None

  public addCastlingRight(right: CastlingRight) {
    this.castlingRights |= right
  }

  public removeCastlingRight(right: CastlingRight) {
    this.castlingRights ^= right
  }

  public hasCastlingRight(right: CastlingRight) {
    return (this.castlingRights & right) === right
  }

  public static square(input: number): Square {
    // TODO: Validation
    return input as Square
  }

  public static readonly TypeMask = 0b00_111
  public static readonly AllegianceMask = 0b11_000

  public static isAllegiance(
    allegiance: Piece.Allegiance,
    input: Piece.Type | Piece.Allegiance
  ): input is Piece.Allegiance {
    return (input & allegiance) === allegiance
  }

  public static isType(
    type: Piece.Type,
    input: Piece.Type | Piece.Allegiance
  ): input is Piece.Type {
    return (input & type) === type
  }

  public static getType(input: Piece.Type | Piece.Allegiance): Piece.Type {
    return (input & Board.TypeMask) as Piece.Type
  }

  public static getAllegiance(
    input: Piece.Type | Piece.Allegiance
  ): Piece.Allegiance {
    return (input & Board.AllegianceMask) as Piece.Allegiance
  }

  public static getColour(input: Piece.Allegiance): Colour {
    return input === Piece.Allegiance.Black ||
      input === Piece.Allegiance.DarkGrey
      ? Colour.Black
      : Colour.White
  }

  private memory: Square[]

  public executor: MoveExecutor

  public moveGenerator: MoveGenerator

  public afen: AfenIO

  constructor(public readonly options: BoardOptions) {
    this.memory = Array.from<Square>({
      length: options.width * options.height,
    }).fill(null)

    this.executor = new MoveExecutor(this)
    this.moveGenerator = new MoveGenerator(this)
    this.afen = new AfenIO(
      this,
      new BoardMemoryAccess(
        () => this.memory,
        (newMemory) => (this.memory = newMemory)
      )
    )
  }

  public getSquare(index: number): Square {
    return this.memory[index]
  }

  public setSquare(index: number, square: Square): void {
    this.memory[index] = square
  }

  /**
   * @internal
   */
  public dump(): string {
    let result = ''

    for (let rank = this.options.height - 1; rank >= 0; rank--) {
      for (let file = 0; file < this.options.width; file++) {
        const index = rank * this.options.width + file
        const square = this.getSquare(index)

        if (index % this.options.width === 0) {
          result += '\n\n'
        }

        if (!square) {
          result += ` .  `
          continue
        }

        const type = Board.getType(square)
        const allegiance = Board.getAllegiance(square)

        result += ` ${Piece.Type[type][0]}${Piece.Allegiance[allegiance][0]} `
      }
    }

    return result
  }

  /**
   * @internal
   */
  public dumpRaw(): string {
    let result = ''

    for (let rank = this.options.height - 1; rank >= 0; rank--) {
      for (let file = 0; file < this.options.width; file++) {
        const index = rank * this.options.width + file
        const square = this.getSquare(index)

        if (index % this.options.width === 0) {
          result += '\n\n'
        }

        if (!square) {
          result += ` .  `
          continue
        }

        result += `${square}`.length === 1 ? ` ${square}  ` : ` ${square} `
      }
    }

    return result
  }
}
