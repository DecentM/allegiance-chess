import VError from "verror";
import { File, Piece, Rank } from "../notation/declarations";

export const letterToFile = (file: string): File => {
  switch (file) {
    case "a":
      return 1;
    case "b":
      return 2;
    case "c":
      return 3;
    case "d":
      return 4;
    case "e":
      return 5;
    case "f":
      return 6;
    case "g":
      return 7;
    case "h":
      return 8;

    default:
      throw new VError(`Cannot map file "${file}" to number`);
  }
};

export const fileToLetter = (file: File): string => {
  switch (file) {
    case 1:
      return "a";
    case 2:
      return "b";
    case 3:
      return "c";
    case 4:
      return "d";
    case 5:
      return "e";
    case 6:
      return "f";
    case 7:
      return "g";
    case 8:
      return "h";

    default:
      throw new VError(`Cannot map "${file}" to file`);
  }
};

export const isPiece = (input: unknown): input is Piece => {
  const pieces: Piece[] = ["B", "K", "N", "Q", "R"];

  return pieces.includes(input as Piece);
};

export const isLowerPiece = (input: unknown): input is Lowercase<Piece> => {
  const pieces: Lowercase<Piece>[] = ["b", "k", "n", "q", "r"];

  return pieces.includes(input as Lowercase<Piece>);
};

export const isFile = (input: unknown): boolean => {
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

  return files.includes(input as string);
};

export const isRank = (input: unknown): input is Rank => {
  return typeof input === "number" && input > 0 && input <= 8;
};
