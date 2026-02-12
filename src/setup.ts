import type p5 from "p5";

import GameController from "./controller/GameController";
import SVGLoader from "./svg/SVGLoader";

export let font: p5.Font;
export let svg_example: string[];
export let gameController: GameController;

export const preload = async (p: p5): Promise<void> => {
  font = await p.loadFont("./font/hyperspace-font/HyperspaceBold-GM0g.ttf");
  SVGLoader.registerRenderer(p);
};

// Disable default browser behavior-- scrolling with arrow keys
// Source - https://stackoverflow.com/a/8916697
// Posted by Zeta, modified by community. See post 'Timeline' for change history
// Retrieved 2026-02-12, License - CC BY-SA 4.0

window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

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
