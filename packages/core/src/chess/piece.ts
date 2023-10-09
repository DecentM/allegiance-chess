export enum Type {
  King = 0b001,
  Pawn = 0b010,
  Knight = 0b11,
  Bishop = 0b100,
  Rook = 0b101,
  Queen = 0b110,
}

export enum Allegiance {
  Black = 0b00_000,
  DarkGrey = 0b01_000,
  LightGrey = 0b10_000,
  White = 0b11_000,
}
