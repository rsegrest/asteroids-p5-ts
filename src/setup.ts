import type p5 from "p5";

import GameController from "./controller/GameController";
export let font: p5.Font;
export let gameController: GameController;
let p:p5;

export const preload = (p:p5):void => {
  font = p.loadFont('./font/hyperspace-font/HyperspaceBold-GM0g.ttf');
}

export const keyPressed = (p:p5):void => {
  if ((p.keyCode === 72)
  || (p.keyCode === 104)) {
    gameController.hyperspace();
  }
}

/** This is a setup function. */
export const setup = (p: p5): void => {
  p = p;
  p.createCanvas(800,600);
  gameController = GameController.createInstance(p, font);
};