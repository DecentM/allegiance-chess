import { Coordinates } from "../notation/parser";

export const coordinatesEqual = (a: Coordinates, b: Coordinates) => {
  return a.file === b.file && a.rank === b.rank;
};
