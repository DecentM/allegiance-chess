import { Node, RootNode } from "./parser";

export const writeNode = (node: Node): string => {
  switch (node.kind) {
    case "draw-offer":
      return "(=)";

    case "game-over":
      switch (node.outcome) {
        case "black":
          return "0-1";

        case "white":
          return "1-0";

        case "draw":
          return "1/2-1/2";

        case "default":
          return "-/-";

        case "default-black":
          return "-/+";

        case "default-white":
          return "+/-";

        case "forfeit":
          return "0-0";

        case "forfeit-black":
          return "0-1/2";

        case "forfeit-white":
          return "1/2-0";
      }

    case "move":
      const writeMove = (action: string, suffix?: string) => {
        let result = "";

        if (node.piece) {
          result += node.piece;
        }

        if (node.from.column) {
          result += `${node.from.column}`;
        }

        if (node.from.rank) {
          result += `${node.from.rank}`;
        }

        result += action;

        if (node.to.column) {
          result += `${node.to.column}`;
        }

        if (node.to.rank) {
          result += `${node.to.rank}`;
        }

        if (node.causesCheck) {
          result += node.isMate ? "#" : "+";
        }

        if (suffix) result += suffix;

        return result;
      };

      switch (node.type) {
        case "allegiance":
          return writeMove(">");

        case "capture":
          return writeMove("x");

        case "castle":
          return node.side === "king" ? "O-O" : "O-O-O";

        case "en-passant":
          return writeMove("x", " e.p.");

        case "promotion":
          return writeMove("=");

        default:
          return writeMove("");
      }
  }
};

export const write = (root: RootNode): string => {
  const steps: string[] = [];

  root.children.forEach((node, moveIndex) => {
    const whitesMove = moveIndex % 2 === 0;

    const write = (move: string) => {
      if (whitesMove) {
        steps.push(move);
      } else {
        steps[steps.length - 1] += ` ${move}`;
      }
    };

    write(writeNode(node));
  });

  return steps
    .filter(Boolean)
    .map((step, index) => `${index + 1}. ${step}`)
    .join("\n");
};
