import { Coordinates } from '../notation/parser'

export const coordinatesEqual = (
  a: Coordinates | null,
  b: Coordinates | null
) => {
  return a && b && a.file === b.file && a.rank === b.rank
}
