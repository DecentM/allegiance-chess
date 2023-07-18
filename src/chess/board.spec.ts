import test from "ava";

import { Board } from "./board";

test("board", (t) => {
  const b = new Board();

  b.setup();

  t.pass();
});
