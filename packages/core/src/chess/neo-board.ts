import { MoveExecutor } from './move-executor'
import * as Piece from './piece'

type Square = Piece.Type | Piece.Allegiance | null

type NeoBoardOptions = {
  width: number
  height: number
}

export class NeoBoard {
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
    return (input & NeoBoard.TypeMask) as Piece.Type
  }

  public static getAllegiance(
    input: Piece.Type | Piece.Allegiance
  ): Piece.Allegiance {
    return (input & NeoBoard.AllegianceMask) as Piece.Allegiance
  }

  private memory: Square[]

  public executor: MoveExecutor

  constructor(public readonly options: NeoBoardOptions) {
    this.memory = Array.from<Square>({
      length: options.width * options.height,
    }).fill(null)

    this.executor = new MoveExecutor(this)
  }

  public getSquare(index: number): Square {
    return this.memory[index]
  }

  public setSquare(index: number, square: Square) {
    this.memory[index] = square
  }

  /**
   * @internal
   */
  public dump() {
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

        const type = NeoBoard.getType(square)
        const allegiance = NeoBoard.getAllegiance(square)

        result += `${Piece.Type[type][0]}${Piece.Allegiance[allegiance][0]} `
      }
    }

    return result
  }
}
