import type p5 from "p5";
import PlayerShip from "./model/PlayerShip";

export let pShip:PlayerShip;

/** This is a setup function. */
export const setup = (p: p5): void => {
  p.createCanvas(400, 400);
  pShip = new PlayerShip(p);
};

export const keyIsDown = (p:p5):void => {
  // function keyPressed() {
  if (p.keyCode === p.LEFT_ARROW) {
    pShip.moveCCW();
  } else if (p.keyCode === p.RIGHT_ARROW) {
    pShip.moveCW();
  } else if (p.keyCode === p.UP_ARROW) {
    console.log('thrust');
  } else if (p.key === ' ') {
    console.log('shoot');
  }
}
