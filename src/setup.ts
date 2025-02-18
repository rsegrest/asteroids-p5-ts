import type p5 from "p5";

import GameController from "./controller/GameController";
export let font: p5.Font;
export let svg_example: p5.XML;
export let gameController: GameController;
let p: p5;

export const preload = (p: p5): void => {
  font = p.loadFont("./font/hyperspace-font/HyperspaceBold-GM0g.ttf");
  svg_example = p.loadXML("./svgimport/quick-svg-from-ai.xml") as p5.XML;
  console.log("SVG--svg_example:");
  console.log(svg_example);
  console.log("SVG--getContent:");
  console.log(svg_example.getContent());

  // console.log("SVG--getChildren('polygon'):");
  // console.log(svg_example.getChildren("polygon"));

  console.log("SVG--getChild('polygon'):");
  console.log(svg_example.getChild("polygon"));
  console.log("SVG--hasChildren:");
  console.log(svg_example.hasChildren());
  console.log("SVG--serialize:");
  console.log(svg_example.serialize());
  console.log("SVG--getAttributeCount:");
  console.log(svg_example.getAttributeCount());
  console.log("SVG--listAttributes:");
  console.log(svg_example.listAttributes());
};

export const keyPressed = (p: p5): void => {
  if (p.keyCode === 72 || p.keyCode === 104) {
    gameController.hyperspace();
  }
};

/** This is a setup function. */
export const setup = (p: p5): void => {
  p = p;
  console.log("setup: width/height");
  console.log(window.innerWidth, window.innerHeight);
  p.createCanvas(window.innerWidth, window.innerHeight);
  gameController = GameController.createInstance(p, font);
};
