import type p5 from "p5";
import { gameController } from "./setup";
import SVGLoader from "./svg/SVGLoader";

export const draw = (p: p5): void => {
  p.background(10);
  gameController.advance();
  SVGLoader.drawAll();
};
