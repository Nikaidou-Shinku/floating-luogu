import { JSX } from "solid-js";

let floatNumber = 2000100;

export const getCardStyle = (x: number, y: number): JSX.CSSProperties => {
  floatNumber += 100;

  const MAX_WIDTH = document.body.clientWidth;

  const deltaRight = x + 169 - MAX_WIDTH;
  const deltaLeft = 218 - x;

  const baseTop = y + 30;
  let baseLeft = x - 150;

  if (deltaRight > 0) {
    baseLeft -= deltaRight;
  }

  if (deltaLeft > 0) {
    baseLeft += deltaLeft;
  }

  return {
    "position": "absolute",
    "z-index": floatNumber,
    "top": `${baseTop}px`,
    "left": `${baseLeft}px`,
  };
};
