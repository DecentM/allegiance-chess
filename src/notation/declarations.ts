export type Column = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";

export type Rank = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";

export type Piece = "K" | "Q" | "R" | "B" | "N";

export type GameOutcome =
  | "white"
  | "black"
  | "draw"
  | "forfeit"
  | "forfeit-white"
  | "forfeit-black"
  | "default"
  | "default-white"
  | "default-black";
