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
