import { File, Rank } from '../notation/declarations'
import { Coordinates } from '../notation/parser'

export const getCoordsForIndex = (index: number): Coordinates => {
  return {
    file: ((index % 8) + 1) as File,
    rank: (8 - Math.floor(index / 8)) as Rank,
  }
}
