import type p5 from "p5";

import GameController from "./controller/GameController";
export let font: p5.Font;
export let gameControlller: GameController;

// import AsteroidController from "./controller/AsteroidController";
// import PlayerController from "./controller/PlayerController";
// import PlayerShip from "./model/PlayerShip";
// import LivesDisplay from "./view/LivesDisplay";
// import PlayerDisplay from "./view/PlayerDisplay";
// import ScoreDisplay from "./view/PlayerScoreDisplay";
// import FooterDisplay from "./view/FooterDisplay";
// import BulletDisplay from "./view/BulletDisplay";

// export let playerDisplay:PlayerDisplay;
// export let bulletDisplay:BulletDisplay;
// export let footerDisplay:FooterDisplay;
// export let pShip:PlayerShip;
// export let asteroidController:AsteroidController;
// export let playerController:PlayerController;
// export let scoreDisplay:ScoreDisplay;
// export let livesDisplay:LivesDisplay;
// export let img: p5.Image;

export const preload = (p:p5):void => {
  font = p.loadFont('./font/hyperspace-font/HyperspaceBold-GM0g.ttf');
}

/** This is a setup function. */
export const setup = (p: p5): void => {
  p.createCanvas(800,600);
  gameControlller = GameController.createInstance(p, font);
};

  // pShip = new PlayerShip(p, font);
  // footerDisplay = new FooterDisplay(
  //   p,
  //   font,
  //   // p.createVector(400,500),
  //   0.5
  // );
  // playerDisplay = new PlayerDisplay(p,0.5);
  // bulletDisplay = new BulletDisplay(p);
  // playerController = new PlayerController(playerDisplay, pShip);
  // asteroidController = new AsteroidController(p);
  // scoreDisplay = new ScoreDisplay(p, font);
  // livesDisplay = new LivesDisplay(p, 3);
