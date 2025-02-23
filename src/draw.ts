import type p5 from "p5";
import GameController from "./controller/GameController";

import { gameController } from "./setup";
import SVGLoader from "./svg/SVGLoader";
// import { displayPolygons } from "./svg/svg";

export const draw = (p: p5): void => {
  p.background(10);
  gameController.advance();
  SVGLoader.drawAll();
};
