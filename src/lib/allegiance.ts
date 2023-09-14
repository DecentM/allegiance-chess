import { PieceAllegiance } from "../chess/board";

export const allegianceSide = (
  allegiance: PieceAllegiance
): "white" | "black" => {
  return allegiance === PieceAllegiance.Black ||
    allegiance == PieceAllegiance.DarkGrey
    ? "black"
    : "white";
};
