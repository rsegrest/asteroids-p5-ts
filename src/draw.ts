import type p5 from "p5";
import GameController from "./controller/GameController";

import {
  gameController,
} from "./setup";



export const draw = (p: p5): void => {
  p.createCanvas(800,600);
  p.background(10);
  gameController.advance();
};
