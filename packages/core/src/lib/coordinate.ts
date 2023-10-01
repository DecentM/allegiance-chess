import { Coordinates } from '../notation/parser'
import { fileToLetter } from './notation'

export const coordinatesEqual = (
  a: Coordinates | null,
  b: Coordinates | null
) => {
  return a && b && a.file === b.file && a.rank === b.rank
}

export const coordinatesToNotation = (input: Coordinates): string => {
  let result = ''

  result += fileToLetter(input.file)
  result += input.rank

  return result
}
