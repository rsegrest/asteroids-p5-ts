import p5 from "p5";
import { createSketch } from "./p5-util/sketch";
import {
  preload,
  setup,
  keyPressed,
} from "./setup";
import { draw } from "./draw";

const sketch = createSketch({
  preload,
  setup,
  draw,
  keyPressed,
});

new p5(sketch);
