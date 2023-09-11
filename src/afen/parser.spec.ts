import test from "ava";
import { tokenize } from "./tokenizer";
import { parse } from "./parser";

test("parses", (t) => {
  const tokens = tokenize("8/5k2/3p4/1p1Pp2p/pP2Pp1P/P4P1K/8/8 b - - 99 50");
  const ast = parse(tokens);

  t.log(ast);

  t.pass();
});
