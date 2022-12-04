import type p5 from "p5";

import { pShip, asteroidController } from "./setup";

// const drawPlayer = (
//   p:p5,
//   rot=p.HALF_PI/2,
// ) => {
//   const thrusting = true;
//   p.push();
//   p.stroke(255);
//   p.noFill();
//   p.strokeWeight(2);
//   p.translate(400, 400);
//   p.rotate(rot);
//   p.quad(0, -40,
//     -15, 15,
//     15,15,
//     0,-40);
//   p.fill(255);
//   if (thrusting) {
//     p.triangle(-10,18,10,18,0,25);
//   }
//   p.pop();
// }
const checkKeys = (p:p5) => {
  if (p.keyIsDown(p.LEFT_ARROW)) {
    pShip.moveCCW();
  } else if (p.keyIsDown(p.RIGHT_ARROW)) {
    pShip.moveCW();
  } else if (p.keyIsDown(p.UP_ARROW)) {
    pShip.addThrust();
  } else if (p.keyIsDown(32)) {
    pShip.addBullet();
  }
}
/** This is a draw function. */
export const draw = (p: p5): void => {
  p.createCanvas(800,600);
  p.background(10);
  checkKeys(p);
  pShip.advance();
  asteroidController.advance();
  const bullet = asteroidController.checkBulletCollisions(pShip.getBullets())
  if (bullet !== null) {
    pShip.removeBullet(bullet.bullet, bullet.index);
  }
};
