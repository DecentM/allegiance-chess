import { Piece } from "../notation/declarations";

export const isPiece = (input: unknown): input is Piece => {
  const pieces: Piece[] = ["B", "K", "N", "Q", "R"];

  return pieces.includes(input as Piece);
};

export const isLowerPiece = (input: unknown): input is Lowercase<Piece> => {
  const pieces: Lowercase<Piece>[] = ["b", "k", "n", "q", "r"];

  return pieces.includes(input as Lowercase<Piece>);
};
