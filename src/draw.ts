import type p5 from "p5";

import {
  pShip,
  asteroidController,
  font,
  scoreDisplay,
  livesDisplay,
  playerController,
  playerDisplay,
  footerDisplay,
} from "./setup";


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


// larger size space ship
const drawSpaceShip = (p:p5) => {
  p.push();
  p.stroke(255,0,255);
  p.strokeWeight(2);
  p.translate(354,40);
  p.noFill();
  p.quad(-55,7,55,7,25,22,-25,22);
  p.quad(-55,7,55,7,20,-10,-20,-10);
  p.quad(20,-10,-20,-10,-10,-30,10,-30);
  p.pop();
}

// small size space ship
const drawSmallSpaceShip = (p:p5) => {
  p.push();
  p.stroke(255,0,255);
  p.strokeWeight(3);
  p.translate(354,112);
  p.scale(0.6);
  p.noFill();
  p.quad(-55,7,55,7,25,22,-25,22);
  p.quad(-55,7,55,7,20,-10,-20,-10);
  p.quad(20,-10,-20,-10,-10,-30,10,-30);
  p.pop();
}



const drawAfterBurner = (p:p5) => {
  p.push();
  p.stroke(255,0,255);
  p.strokeWeight(2);
  p.translate(38,475);
  p.noFill();
  p.beginShape();
  p.vertex(0,12);
  p.vertex(-9,0);
  p.vertex(9,0);
  p.endShape(p.CLOSE);
  p.pop();
}



export const draw = (p: p5): void => {
  p.createCanvas(800,600);
  p.background(10);
  // addFooter(p,font);

  scoreDisplay.draw(123456);
  livesDisplay.draw();
  checkKeys(p);
  pShip.advance();
  asteroidController.advance();
  playerController.advance();
  playerDisplay.draw(pShip);
  footerDisplay.draw();
  const bullet = asteroidController.checkBulletCollisions(pShip.getBullets())
  if (bullet !== null) {
    const explosionPos = bullet.bullet.getPos();
    pShip.removeBullet(bullet.bullet, bullet.index);
    
  }
};

// small
// const drawAsteroidOne = (p:p5) => {
//   p.push();
//   p.stroke(255,0,255);
//   p.strokeWeight(2);
//   p.translate(25,30);
//   p.noFill();
//   p.beginShape();
//   p.vertex(-8, -18);
//   p.vertex(5, -18);
//   p.vertex(20, -8);
//   p.vertex(20, -5);
//   p.vertex(2, 2);
//   p.vertex(20, 9);
//   p.vertex(10, 20);
//   p.vertex(2, 15);
//   p.vertex(-10, 21);
//   p.vertex(-20, 2);
//   p.vertex(-20, -8);
//   p.vertex(-2, -8);
//   p.endShape(p.CLOSE);
//   p.pop();
// }


// small size "death star"
// const drawAsteroidSeven = (p:p5) => {
//   p.push();
//   p.stroke(255,0,255);
//   p.strokeWeight(2);
//   p.translate(355,485);
//   p.noFill();
//   p.beginShape();
//   p.vertex(26,-24); 
//   p.vertex(40,-36);
//   p.vertex(48,-32);
//   p.vertex(40,-16);
//   p.vertex(48,-8); 
//   p.vertex(36,5); 
//   p.vertex(14,5);
//   p.vertex(8,0);
//   p.vertex(8,-24);
//   p.vertex(16,-36);
//   p.endShape(p.CLOSE);
//   p.pop();
// }

// // medium size
// const drawAsteroidTwo = (p:p5) => {
//   p.push();
//   p.stroke(255,0,255);
//   p.strokeWeight(2);
//   p.translate(160,40);
//   p.noFill();
//   // p.circle(0,0,70);
//   p.beginShape();
//   p.vertex(-2,-22);
//   p.vertex(14,-34);
//   p.vertex(34,-18);
//   p.vertex(16,-9);
//   p.vertex(34,12);
//   p.vertex(16,36);
//   p.vertex(-12,28);
//   p.vertex(-18,34);
//   p.vertex(-20,36);
//   p.vertex(-38,18);
//   p.vertex(-28,6);
//   p.vertex(-40,-18);
//   p.vertex(-15,-35);
//   p.endShape(p.CLOSE);
//   p.pop();
// }

// // large size
// const drawAsteroidThree = (p:p5) => {
//   p.push();
//   p.stroke(255,0,255);
//   p.strokeWeight(2);
//   p.translate(60,150);
//   p.noFill();
//   p.beginShape();
//   p.vertex(3,-18);
  
//   p.vertex(-18,-54);
//   p.vertex(28,-54);
//   p.vertex(82,-22);
//   p.vertex(82,-2);
//   p.vertex(22,16);

//   p.vertex(80,52);
//   p.vertex(50,86);
//   p.vertex(22,64);

//   p.vertex(-25,86);
//   p.vertex(-50,32);
//   p.vertex(-50,-18);
//   p.endShape(p.CLOSE);
//   p.pop();
// }

// // large size
// const drawAsteroidFour = (p:p5) => {
//   p.push();
//   p.stroke(255,0,255);
//   p.strokeWeight(2);
//   p.translate(230,180);
//   p.noFill();
//   p.beginShape();
//   p.vertex(-2,-40);
//   p.vertex(34,-60);
//   p.vertex(72,-20);
//   p.vertex(28,-9);
//   p.vertex(72,24);
//   p.vertex(28,80);
//   p.vertex(-18,56);
//   p.vertex(-34,78);
//   p.vertex(-70,38);
//   p.vertex(-48,16);
//   p.vertex(-68,-22);
//   p.vertex(-22,-60);
//   p.endShape(p.CLOSE);
//   p.pop();
// }

// // large size
// const drawAsteroidFive = (p:p5) => {
//   p.push();
//   p.stroke(255,0,255);
//   p.strokeWeight(2);
//   p.translate(320,340);
//   p.noFill();
//   p.beginShape();
//   p.vertex(7,-38);
//   p.vertex(42,-60); // top right
//   p.vertex(78,-32); // right top
//   p.vertex(54,0); // right middle
//   p.vertex(80,34); // right bottom
//   p.vertex(28,76); // bottom right edge
//   p.vertex(-32,76); // bottom left edge
//   p.vertex(-60,45);
//   p.vertex(-60,-22);
//   p.vertex(-22,-60); // top left
//   p.endShape(p.CLOSE);
//   p.pop();
// }


// // medium size "death star"
// const drawAsteroidSix = (p:p5) => {
//   p.push();
//   p.stroke(255,0,255);
//   p.strokeWeight(2);
//   p.translate(360,180);
//   p.noFill();
//   p.beginShape();
//   p.vertex(8,-16);
//   p.vertex(34,12);
//   p.vertex(18,20); // top right
//   p.vertex(36,28); // right top
//   p.vertex(18,60); // right middle
//   p.vertex(2,25); // right bottom
//   p.vertex(4,60); // bottom right edge
//   p.vertex(-16,60); // bottom left edge
//   p.vertex(-40,20);
//   p.vertex(-40,10);
//   p.vertex(-22,-16); // top left
//   p.endShape(p.CLOSE);
//   p.pop();
// }

// const drawPlayer = (p:p5, position:p5.Vector, scale:number, color:string) => {
//   p.push();
//   p.stroke(color);
//   p.strokeWeight(2);
//   p.translate(position);
//   p.scale(scale);
//   p.noFill();
//   p.beginShape();
//   p.vertex(0,-20);
//   p.vertex(-20,32);
//   p.vertex(-14,22);
//   p.vertex(14,22);
//   p.vertex(20,32);
//   p.endShape(p.CLOSE);
//   p.pop();
// }

// const addFooter = (p:p5, font:p5.Font):void => {
//   p.fill('#2f2');
//   p.textFont(font);
//   p.textSize(16);
//   p.text('© 2022 Rick Segrest', 300, 500);
// }

// const addScoreDisplay = (p:p5, font:p5.Font, score:number):void => {
//   p.push();
//   if (p.frameCount % 3 === 0) {
//     p.strokeWeight(p.frameCount % 2)
//     p.fill('#0f0'); // 2f2 / afa
//     p.textFont(font);
//     p.textSize(16);
//     p.text(score.toString(), 100, 100);
//   }
//   p.pop();
// }

// const addLivesDisplay = (p:p5, numLives:number):void => {
//   p.push();
//   for (let i = 0; i < numLives; i++) {
//     if (p.frameCount % 3 === 0) {
//       p.strokeWeight(p.frameCount % 2)
//       p.stroke('#0a0');
//       p.strokeWeight((p.frameCount % 3));
//       // drawPlayer(p,p.createVector(130+(i*8),115),0.2,'#0a0');  
//       p.fill('#fff'); // 2f2
//       p.noStroke();
//       // drawPlayer(p,p.createVector(130+(i*8),115),0.2,'#2f2');
//     }
//   }
//   p.pop();
// }

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