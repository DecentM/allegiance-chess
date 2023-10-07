export { Board, PieceAllegiance } from './chess/board'

export { allegianceSide } from './lib/allegiance'
export { coordinatesEqual } from './lib/coordinate'
export { fileToLetter } from './lib/notation'
export { getCoordsForIndex, isPromotion, getIndexForCoords } from './lib/board'
export * from './lib/afen-preset'

export type { BoardSquare } from './chess/board-memory'

export * as Afen from './afen'
export * as Notation from './notation'
