import { Coordinates, File, Rank } from '../notation/declarations'

export const getCoordsForIndex = (index: number): Coordinates => {
  return {
    file: ((index % 8) + 1) as File,
    rank: (8 - Math.floor(index / 8)) as Rank,
  }
}

export const getIndexForCoords = (coords: Coordinates): number => {
  return (9 - coords.rank - 1) * 8 + (coords.file - 1)
}

export const isPromotion = (coords: Coordinates, side: 'white' | 'black') =>
  coords.rank === (side === 'white' ? 8 : 1)
