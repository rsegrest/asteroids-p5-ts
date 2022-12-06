import p5 from 'p5';
import Asteroid from '../model/Asteroid';
import AsteroidDisplay from '../view/AsteroidDisplay';
import LargeAsteroid from '../model/LargeAsteroid';
import MediumAsteroid from '../model/MediumAsteroid';
import Bullet from '../model/Bullet';
import Explosion from '../model/Explosion';
import SmallAsteroid from '../model/SmallAsteroid';
import ExplosionDisplay from '../view/ExplosionDisplay';

import AsteroidType, {
  LARGE_ASTEROID_1,
  LARGE_ASTEROID_2,
  LARGE_ASTEROID_3,
  MEDIUM_ASTEROID_1,
  MEDIUM_ASTEROID_2,
  MEDIUM_ASTEROID_3,
  SMALL_ASTEROID_1,
  SMALL_ASTEROID_2,
} from '../type/AsteroidType';
class AsteroidController {
  private p:p5;
  private asteroids:Asteroid[] = [];
  private asteroidDisplay:AsteroidDisplay;
  private explosions:Explosion[] = [];
  private explosionDisplay:ExplosionDisplay;
  constructor (p:p5) {
    this.p = p;
    this.spawnLargeAsteroid(
      p.createVector(200, 200),
      p.createVector(
        Math.random()-1,
        Math.random()-1
      ));
    this.asteroidDisplay = new AsteroidDisplay(p);
    this.explosionDisplay = new ExplosionDisplay(p);
    this.explosions.push(
      new Explosion(
        p,
        p.createVector(200, 200),
      )
    );
  }
  reposition = (position:p5.Vector):p5.Vector => {
    let newPos = position;
    if (position.x < 0) {
      newPos.x = newPos.x + this.p.width;
    }
    if (position.y < 0) {
      newPos.y = newPos.y + this.p.height;
    }
    if (position.x > this.p.width) {
      newPos.x = newPos.x - this.p.width;
    }
    if (position.y > this.p.height) {
      newPos.y = newPos.y - this.p.height;
    }
    return newPos;
  }
  spawnLargeAsteroid = (
    position:p5.Vector,
    velocity:p5.Vector,
  ):void => {
    const newPos = this.reposition(position);
    const largeAsteroidTypes = [
      LARGE_ASTEROID_1,
      LARGE_ASTEROID_2,
      LARGE_ASTEROID_3,
    ];
    const randomIndex = Math.floor(Math.random()*largeAsteroidTypes.length);
    this.asteroids.push(
      new LargeAsteroid(
        this.p,
        newPos,
        largeAsteroidTypes[randomIndex] as AsteroidType,
        velocity,
      ),
    );
  }
  spawnMediumAsteroid = (
    position:p5.Vector,
    velocity:p5.Vector
  ):void => {
    const newPos = this.reposition(position);
    const mediumAsteroidTypes = [
      MEDIUM_ASTEROID_1,
      MEDIUM_ASTEROID_2,
      MEDIUM_ASTEROID_3,
    ];
    this.asteroids.push(
      new MediumAsteroid(
        this.p,
        newPos,
        mediumAsteroidTypes[Math.floor(Math.random()*mediumAsteroidTypes.length)] as AsteroidType,
        velocity,
      ),
    );
  }
  spawnSmallAsteroid = (
    position:p5.Vector,
    velocity:p5.Vector,
  ):void => {
    const newPos = this.reposition(position);
    const smallAsteroidTypes = [
      SMALL_ASTEROID_1,
      SMALL_ASTEROID_2,
    ];
    this.asteroids.push(
      new SmallAsteroid(
        this.p,
        newPos,
        smallAsteroidTypes[Math.floor(Math.random()*smallAsteroidTypes.length)] as AsteroidType,
        velocity,
      ),
    );
  }
  breakUpAsteroid = (asteroid:LargeAsteroid|MediumAsteroid|SmallAsteroid, index:number):void => {
    const position = asteroid.getPos();
    this.asteroids.splice(index, 1);
    if (asteroid instanceof LargeAsteroid) {
      const velocityList = [
        this.p.createVector(Math.random()-1,Math.random()-1),
        this.p.createVector(Math.random()-1,Math.random()-1),
      ]
      this.spawnMediumAsteroid(position, velocityList[0]!);
      this.spawnMediumAsteroid(position, velocityList[1]!);
    } else if (asteroid instanceof MediumAsteroid) {
      const velocityList = [
        this.p.createVector(Math.random()-1,Math.random()-1),
        this.p.createVector(Math.random()-1,Math.random()-1),
      ]
      this.spawnSmallAsteroid(position, velocityList[0]!);
      this.spawnSmallAsteroid(position, velocityList[1]!);
    }
  }
  advance = ():void => {
    this.asteroids.forEach((asteroid, index) => {
      const newPositionX = asteroid.getPos().x + asteroid.getVelocity().x;
      const newPositionY = asteroid.getPos().y + asteroid.getVelocity().y;
      asteroid.setPos(this.p.createVector(newPositionX, newPositionY));
      if (asteroid.getPos().x as number > this.p.width) {
        asteroid.getPos().x = 0;
      } else if (asteroid.getPos().x as number < 0) {
        asteroid.getPos().x = this.p.width;
      }
      if (asteroid.getPos().y as number > this.p.height) {
        asteroid.getPos().y = 0;
      } else if (asteroid.getPos().y as number < 0) {
        asteroid.getPos().y = this.p.height;
      }
      AsteroidDisplay.draw(asteroid);
    });
    console.log(`explosions: ${this.explosions.length}`)
    
    // LEFT-OFF
    this.explosions.forEach((explosion, index) => {
      explosion.advance();
      console.log(`explosion: ${explosion.getPos()}`)
      ExplosionDisplay.draw(explosion);
    });
  }
  checkBulletCollisions = (bullets:Bullet[]):null|{
    bullet:Bullet, index:number
  } => {
    // bullets.forEach((bullet, index) => {
    for (let i = 0; i < bullets.length; i++) {
      for (let j = 0; j < this.asteroids.length; j++) {
        if ((this.asteroids[j]!).checkCollision(bullets[i] as Bullet)) {
          const explosionPosition = this.asteroids[j]!.getPos();
          this.explosions.push(
            new Explosion(
              this.p,
              explosionPosition
            )
          );
          this.breakUpAsteroid(this.asteroids[j]!, j);
          return {
            bullet: (bullets[i]!), index: i
          };
        }
      };
    }
    return null;
  }
  getAsteroids = ():Asteroid[] => {
    return this.asteroids;
  }
  toString():string {
    let asteroidList = '[';
    this.asteroids.forEach((asteroid) => {
      asteroidList += '\n\t' + asteroid.toString();
    });
    asteroidList += '\n]';
    return `AsteroidController: asteroids: ${this.asteroids}`;
  }
}
export default AsteroidController;