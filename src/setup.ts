import type p5 from "p5";

import GameController from "./controller/GameController";
import SVGLoader from "./svg/SVGLoader";
// import {
//   loadSVG,
//   processSVG,
//   lines,
//   polygons,
//   displayPolygons,
// } from "./svg/svg";

export let font: p5.Font;
export let svg_example: string[];
export let gameController: GameController;

// let p: p5;

export const preload = (p: p5): void => {
  font = p.loadFont("./font/hyperspace-font/HyperspaceBold-GM0g.ttf");
  SVGLoader.registerRenderer(p);
  SVGLoader.loadSVG("quick-svg-from-ai.svg");
  SVGLoader.loadSVG("w3examples/line/svgLine.svg");
  SVGLoader.loadSVG("w3examples/circle/circleWithOpacity.svg");
  SVGLoader.loadSVG("w3examples/rect/svgRectExample.svg");
  SVGLoader.loadSVG("w3examples/path/svgPathTriangle.svg");
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
