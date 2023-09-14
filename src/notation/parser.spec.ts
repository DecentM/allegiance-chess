import test from "ava";
import { parse } from "./parser";
import { tokenize } from "./tokenizer";

test("allegiance", (t) => {
  const result = parse(
    tokenize("axb5 d3d4 Nf1e3 Qxd8 xd2 e.p. Ka5 Nxf7 N>d2 Bd5>e6# 1-0")
  );

  t.pass();
});

// http://www.saremba.de/chessgml/standards/pgn/pgn-complete.htm#c2.3
test("specs", (t) => {
  const result = parse(
    tokenize(`1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3
O-O 9. h3 Nb8 10. d4 Nbd7 11. c4 c6 12. cxb5 axb5 13. Nc3 Bb7 14. Bg5 b4 15.
Nb1 h6 16. Bh4 c5 17. dxe5 Nxe4 18. Bxe7 Qxe7 19. exd6 Qf6 20. Nbd2 Nxd6 21.
Nc4 Nxc4 22. Bxc4 Nb6 23. Ne5 Rae8 24. Bxf7+ Rxf7 25. Nxf7 Rxe1+ 26. Qxe1 Kxf7
27. Qe3 Qg5 28. Qxg5 hxg5 29. b3 Ke6 30. a3 Kd6 31. axb4 cxb4 32. Ra5 Nd5 33.
f3 Bc8 34. Kf2 Bf5 35. Ra7 g6 36. Ra6+ Kc5 37. Ke1 Nf4 38. g3 Nxh3 39. Kd2 Kb5
40. Rd6 Kc5 41. Ra6 Nf2 42. g4 Bd3 43. Re6 1/2-1/2`)
  );

  t.pass();
});

test("parses Nf3", (t) => {
  const tokens = tokenize("1. Nf3");
  const result = parse(tokens);

  t.deepEqual(result.children, [
    {
      ...result.children[0],
      kind: "move",
      to: { file: 6, rank: 3 },
      piece: "N",
    },
  ]);
});
