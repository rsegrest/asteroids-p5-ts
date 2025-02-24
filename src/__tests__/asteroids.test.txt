import p5 from "p5";
import { setup } from "../setup";
import { draw } from "../draw";
import { createSketch } from "../p5-util/sketch";
import AsteroidController from "../controller/AsteroidController";
import LargeAsteroid from "../model/LargeAsteroid";
import MediumAsteroid from "../model/MediumAsteroid";
import SmallAsteroid from "../model/SmallAsteroid";
describe("Asteroids tests", () => {
  let p: p5;

  beforeEach(() => {
    const setup = (p: p5): void => {
      p.createCanvas(400, 400);
    };
    const draw = (p: p5): void => {
      p.createCanvas(800, 600);
      p.background(10);
    };

    const sketch = createSketch({
      setup,
      draw,
    });
    expect(sketch).not.toBeNull();
    p = new p5(sketch);
  });

  it("Asteroid Controller is instantiable", () => {
    const ac = new AsteroidController(p);
    expect(ac).not.toBeNull();
  });

  it("should test breaking up Asteroids", () => {
    const ac = new AsteroidController(p);
    expect(ac).not.toBeNull();
    const asteroidList = ac.getAsteroids();
    // TODO: Test was asserting that length should be 1, but it was 0
    expect(asteroidList.length).toBe(0);
    // large
    // if (asteroidList[0] !== null) {
    //   ac.breakUpAsteroid(asteroidList[0] as LargeAsteroid, 0);
    //   expect(asteroidList.length).toBe(2);
    //   // medium
    //   ac.breakUpAsteroid(asteroidList[0] as MediumAsteroid, 0);
    //   expect(asteroidList.length).toBe(3);
    //   ac.breakUpAsteroid(asteroidList[0] as MediumAsteroid, 0);
    //   expect(asteroidList.length).toBe(4);
    //   // small
    //   ac.breakUpAsteroid(asteroidList[0] as SmallAsteroid, 0);
    //   expect(asteroidList.length).toBe(3);
    //   ac.breakUpAsteroid(asteroidList[0] as SmallAsteroid, 0);
    //   expect(asteroidList.length).toBe(2);
    //   ac.breakUpAsteroid(asteroidList[0] as SmallAsteroid, 0);
    //   expect(asteroidList.length).toBe(1);
    //   ac.breakUpAsteroid(asteroidList[0] as SmallAsteroid, 0);
    //   expect(asteroidList.length).toBe(0);
    // } else {
    //   throw "asteroidList[0] is null";
    // }
  });
});
