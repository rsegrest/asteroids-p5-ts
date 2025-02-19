import type p5 from "p5";
import GameController from "./controller/GameController";

import { gameController } from "./setup";
import { displayPolygons } from "./svg/svg";

export const draw = (p: p5): void => {
  // p.createCanvas(window.innerWidth, window.innerHeight);
  p.background(10);
  gameController.advance();
  displayPolygons(p);
};
