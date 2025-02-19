import type p5 from "p5";

import GameController from "./controller/GameController";
import {
  loadSVG,
  processSVG,
  lines,
  polygons,
  displayPolygons,
} from "./svg/svg";

export let font: p5.Font;
export let svg_example: string[];
export let gameController: GameController;
let p: p5;

export const preload = (p: p5): void => {
  font = p.loadFont("./font/hyperspace-font/HyperspaceBold-GM0g.ttf");

  loadSVG(p).then((result: any) => {
    console.log("then->");
    // console.log(lines);
    console.log(result);
    const polygonPromise = processSVG(p, lines);
    // .then((r2: any) => {
    //   console.log("then(2)->");
    //   console.log("polygons:");
    //   console.log(polygons);
    //   console.log("r2");
    //   console.log(r2);
    // });
    polygonPromise.then((PGs: any) => {
      console.log("completed pg promise");
      // console.log("polygons:");
      // console.log(polygons);
    });
  });
  // console.log("svg_example:");
  // console.log(svg_example);
  // svg_example = p.loadXML("./svgimport/quick-svg-from-ai.xml") as p5.XML;
  // console.log("SVG--svg_example:");
  // console.log(svg_example);
  // console.log("SVG--getContent:");
  // console.log(svg_example.getContent());

  // console.log("SVG--getChildren('polygon'):");
  // console.log(svg_example.getChildren("polygon"));

  // console.log("SVG--getChild('polygon'):");
  // console.log(svg_example.getChild("polygon"));
  // console.log("SVG--hasChildren:");
  // console.log(svg_example.hasChildren());
  // console.log("SVG--serialize:");
  // console.log(svg_example.serialize());
  // console.log("SVG--getAttributeCount:");
  // console.log(svg_example.getAttributeCount());
  // console.log("SVG--listAttributes:");
  // console.log(svg_example.listAttributes());
};

export const keyPressed = (p: p5): void => {
  if (p.keyCode === 72 || p.keyCode === 104) {
    gameController.hyperspace();
  }
};

/** This is a setup function. */
export const setup = (p: p5): void => {
  console.log("LINES???");
  console.log(lines);
  processSVG(p, lines);
  // displayPolygons(p);
  console.log("setup: width/height");
  console.log(window.innerWidth, window.innerHeight);
  p.createCanvas(window.innerWidth, window.innerHeight);
  gameController = GameController.createInstance(p, font);
};
