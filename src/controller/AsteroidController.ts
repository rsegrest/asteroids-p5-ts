import p5 from 'p5';
import Asteroid from '../model/Asteroid';
import AsteroidDisplay from '../view/AsteroidDisplay';
import LargeAsteroid from '../model/LargeAsteroid';
import SoundManager from '../util/SoundManager';
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
import PlayerShip from '../model/PlayerShip';

class AsteroidController {
  private p:p5;
  private asteroids:Asteroid[] = [];
  private explosions:Explosion[] = [];
  private asteroidDisplay:AsteroidDisplay;
  private explosionDisplay:ExplosionDisplay;
  private scale:number;

  constructor (p:p5, scale:number = 1) {
    this.p = p;
    this.scale = scale;
    this.asteroidDisplay = new AsteroidDisplay(p, scale);
    this.explosionDisplay = new ExplosionDisplay(p, scale);
  }

  getRandomAsteroidSpawnPosition = () => {
    const x = Math.random() * this.p.width;
    let y = Math.random() * this.p.height/2;
    if (y > this.p.height/4) {
      y += this.p.height/2;
    }
    return this.p.createVector(x, y);
  }

  getRandomVector = (scalar:number) => {
    return this.p.createVector(
      (Math.random()*scalar*2)-(scalar),
      (Math.random()*scalar*2)-(scalar),
    );
  }

  getNumActiveAsteroids = ():number => {
    let asteroidCount = 0;
    for (let i = 0; i < this.asteroids.length; i++) {
      if (this.asteroids[i]!.getIsActive()) {
        asteroidCount += 1;
      }
    }
    return asteroidCount;
  }

  spawnAsteroidWave = (levelNum:number):void => {
    for (let i = 0; i < 4; i++) {
      this.spawnLargeAsteroid(
        this.getRandomAsteroidSpawnPosition(),
        this.getRandomVector(1),
      );
    }
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
        this.scale,
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
        this.scale,
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
      SMALL_ASTEROID_2
    ];
    const randomIndex = Math.floor(Math.random()*smallAsteroidTypes.length)
    const asteroidType = smallAsteroidTypes[randomIndex] as AsteroidType;
    this.asteroids.push(
      new SmallAsteroid(
        this.p,
        newPos,
        asteroidType as AsteroidType,
        this.scale,
        velocity,
      ),
    );
  }

  breakUpAsteroid = (asteroid:LargeAsteroid|MediumAsteroid|SmallAsteroid, index:number):void => {
    const position = asteroid.getPos();
    const velocity = asteroid.getVelocity();
    this.asteroids.splice(index, 1);
    
    if (asteroid instanceof LargeAsteroid) {
      // Divergent velocities for medium asteroids
      const v1 = velocity.copy().rotate(this.p.PI / 6).mult(1.5);
      const v2 = velocity.copy().rotate(-this.p.PI / 6).mult(1.5);
      
      // Offset positions slightly to prevent overlap
      const p1 = position.copy().add(v1.copy().setMag(15));
      const p2 = position.copy().add(v2.copy().setMag(15));

      this.spawnMediumAsteroid(p1, v1);
      this.spawnMediumAsteroid(p2, v2);
      SoundManager.getInstance().playBangLarge();
    } else if (asteroid instanceof MediumAsteroid) {
      // Divergent velocities for small asteroids
      const v1 = velocity.copy().rotate(this.p.PI / 6).mult(1.5);
      const v2 = velocity.copy().rotate(-this.p.PI / 6).mult(1.5);
      
      const p1 = position.copy().add(v1.copy().setMag(10));
      const p2 = position.copy().add(v2.copy().setMag(10));

      this.spawnSmallAsteroid(p1, v1);
      this.spawnSmallAsteroid(p2, v2);
      SoundManager.getInstance().playBangMedium();
    } else if (asteroid instanceof SmallAsteroid) {
      asteroid.setInactive();
      SoundManager.getInstance().playBangSmall();
    }
  }

  advance = ():void => {
    this.asteroids.forEach((asteroid) => {
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
    this.explosions.forEach((explosion, index) => {
      explosion.advance();
      ExplosionDisplay.draw(explosion);
    });
  }

  checkPlayerCollisions = (player:PlayerShip):boolean => {
    let collided = false;
    this.asteroids.forEach((asteroid, index) => {
      if (asteroid.checkCollision(player)) {
        collided = true;
        this.breakUpAsteroid(asteroid, index);
        this.breakUpAsteroid(asteroid, index);
        player.setIsResetting(true);
        SoundManager.getInstance().playBangLarge(); // Ship explosion
      }
    });
    return collided;
  }

  checkBulletCollisions = (bullets:Bullet[]):null|{
    bullet:Bullet, index:number, asteroidType:AsteroidType
  } => {
  
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
          const asteroidType = this.asteroids[j]?.getType() as AsteroidType;
          this.breakUpAsteroid(this.asteroids[j]!, j);
          return {
            bullet: (bullets[i]!),
            index: i,
            asteroidType,
          };
        }
      };
    }
    return null;
  }

  getAsteroids = ():Asteroid[] => {
    return this.asteroids;
  }

  addExplosion = (explosion:Explosion):void => {
    this.explosions.push(explosion);
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