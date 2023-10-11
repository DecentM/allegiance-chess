import { Allegiance } from '../notation'

export const allegianceSide = (allegiance: Allegiance): 'white' | 'black' => {
  return allegiance === Allegiance.Black || allegiance == Allegiance.DarkGrey
    ? 'black'
    : 'white'
}
