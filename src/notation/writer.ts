import { RootNode } from "./parser";

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

    switch (node.kind) {
      case "draw-offer":
        write("(=)");
        break;

      case "game-over":
        switch (node.outcome) {
          case "black":
            write("0-1");
            break;

          case "white":
            write("1-0");
            break;

          case "draw":
            write("1/2-1/2");
            break;

          case "default":
            write("-/-");
            break;

          case "default-black":
            write("-/+");
            break;

          case "default-white":
            write("+/-");
            break;

          case "forfeit":
            write("0-0");
            break;

          case "forfeit-black":
            write("0-1/2");
            break;

          case "forfeit-white":
            write("1/2-0");
            break;
        }
        break;

      case "move":
        const writeMove = (action: string, suffix?: string) => {
          let result = "";

          if (node.piece) {
            result += node.piece;
          }

          if (node.from.column && node.from.rank) {
            result += `${node.from.column}${node.from.rank}`;
          }

          result += action;

          if (node.to.column && node.to.rank) {
            result += `${node.to.column}${node.to.rank}`;
          }

          if (node.causesCheck) {
            result += node.isMate ? "#" : "+";
          }

          if (suffix) result += suffix;

          return write(result);
        };

        switch (node.type) {
          case "allegiance":
            writeMove(">");
            break;

          case "capture":
            writeMove("x");
            break;

          case "castle":
            write(node.side === "king" ? "O-O" : "O-O-O");
            break;

          case "en-passant":
            writeMove("", " e.p.");
            break;

          case "promotion":
            writeMove("=");
            break;

          default:
            writeMove("");
            break;
        }
        break;
    }
  });

  return steps
    .filter(Boolean)
    .map((step, index) => `${index + 1}. ${step}`)
    .join("\n");
};
