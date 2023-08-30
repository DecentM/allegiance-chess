import test from "ava";

import { Board } from "./board";
import { Vector2 } from "../lib/vector2";

test("board", (t) => {
  const b = new Board();

  b.traceCapture(
    {
      file: 1,
      rank: 2,
    },
    new Vector2(0, 10)
  );

  t.pass();
});

test("traces steps forward", (t) => {
  const b = new Board();

  const steps = b.traceCaptureSteps(
    {
      file: 1,
      rank: 2,
    },
    new Vector2(0, 10)
  );

  t.deepEqual(steps, [
    { file: 1, rank: 3 },
    { file: 1, rank: 4 },
    { file: 1, rank: 5 },
    { file: 1, rank: 6 },
    { file: 1, rank: 7 },
  ]);
});
