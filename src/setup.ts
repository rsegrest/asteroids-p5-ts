import type p5 from "p5";
import AsteroidController from "./controller/AsteroidController";
import PlayerShip from "./model/PlayerShip";

export let pShip:PlayerShip;
export let asteroidController:AsteroidController;
export let img: p5.Image;

export const preload = (p:p5):void => {
  img = p.loadImage("../example/images.png");
}

/** This is a setup function. */
export const setup = (p: p5): void => {
  p.image(img, 0, 0);
  
  p.createCanvas(400, 400);
  pShip = new PlayerShip(p);
  asteroidController = new AsteroidController(p);
};
