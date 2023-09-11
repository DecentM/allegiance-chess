import test from "ava";
import { BoardMemory } from "./board-memory";

test("case 1", (t) => {
  const memory = new BoardMemory();

  memory.importAFEN("4k2r/6r1/8/8/8/8/3R4/R3K3 w Qk - 0 1");

  t.snapshot(memory.dump());
});

test("case 2", (t) => {
  const memory = new BoardMemory();

  memory.importAFEN(
    "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1"
  );

  t.snapshot(memory.dump());
});
