import type p5 from "p5";

import GameController from "./controller/GameController";
import SVGLoader from "./svg/SVGLoader";

export let font: p5.Font;
export let svg_example: string[];
export let gameController: GameController;

export const preload = (p: p5): void => {
  font = p.loadFont("./font/hyperspace-font/HyperspaceBold-GM0g.ttf");
  SVGLoader.registerRenderer(p);
};

export const keyPressed = (p: p5): void => {
  if (p.keyCode === 72 || p.keyCode === 104) {
    gameController.hyperspace();
  }
};

/** This is a setup function. */
export const setup = (p: p5): void => {
  p.createCanvas(window.innerWidth, window.innerHeight);
  gameController = GameController.createInstance(p, font);
};
