export type File = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export type Piece = 'K' | 'Q' | 'R' | 'B' | 'N'

export const GameOutcome = {
  White: 'white',
  Black: 'black',
  Draw: 'draw',
  Forfeit: 'forfeit',
  ForfeitWhite: 'forfeit-white',
  ForfeitBlack: 'forfeit-black',
} as const

export type GameOutcome = (typeof GameOutcome)[keyof typeof GameOutcome]

export const Allegiance = {
  Black: 0,
  DarkGrey: 1,
  LightGrey: 2,
  White: 3,
} as const

export type Allegiance = (typeof Allegiance)[keyof typeof Allegiance]

export type Coordinates = {
  file: File
  rank: Rank
}
