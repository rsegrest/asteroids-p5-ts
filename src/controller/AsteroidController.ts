import p5 from 'p5';
import Asteroid from '../model/Asteroid';
import LargeAsteroid from '../model/LargeAsteroid';
import MediumAsteroid from '../model/MediumAsteroid';
import Bullet from '../model/Bullet';
import SmallAsteroid from '../model/SmallAsteroid';
class AsteroidController {
  private p:p5;
  private asteroids:Asteroid[] = [];
  constructor (p:p5) {
    this.p = p;
    this.spawnLargeAsteroid();
    // this.asteroids = [
    //   new LargeAsteroid(
    //     this.p,
    //     this.p.createVector(100,100),
    //   ),
    //   new MediumAsteroid(
    //     this.p,
    //     this.p.createVector(200,200),
    //   ),
    //   new SmallAsteroid(
    //     this.p,
    //     this.p.createVector(300,300),
    //   ),
    // ];
  }
  spawnLargeAsteroid = ():void => {
    this.asteroids.push(
      new LargeAsteroid(
        this.p,
        this.p.createVector(
          this.p.random(0, this.p.width),
          this.p.random(0, this.p.height),
        ),
        this.p.createVector(
          Math.random()*1-2,
          Math.random()*1-2,
        ),
      ),
    );
  }
  spawnMediumAsteroid = (pos:p5.Vector):void => {
    this.asteroids.push(
      new MediumAsteroid(
        this.p,
        pos,
        this.p.createVector(
          Math.random()*1-2,
          Math.random()*1-2,
        ),
      ),
    );
  }
  spawnSmallAsteroid = (pos:p5.Vector):void => {
    this.asteroids.push(
      new SmallAsteroid(
        this.p,
        pos,
        this.p.createVector(
          Math.random()*1-2,
          Math.random()*1-2,
        ),
      ),
    );
  }
  breakUpLargeAsteroid = (asteroid:LargeAsteroid, index:number):void => {
    const pos = asteroid.getPos();
    this.asteroids.splice(index, 1);
    this.spawnMediumAsteroid(pos);
    this.spawnMediumAsteroid(pos);
  }
  breakUpMediumAsteroid = (asteroid:MediumAsteroid, index:number):void => {
    const pos = asteroid.getPos();
    this.asteroids.splice(index, 1);
    this.spawnSmallAsteroid(pos);
    this.spawnSmallAsteroid(pos);
    this.spawnSmallAsteroid(pos);
    this.spawnSmallAsteroid(pos);
  }
  destroySmallAsteroid = (asteroid:SmallAsteroid, index:number):void => {
    this.asteroids.splice(index, 1);
  }
  advance = (bullets:Bullet[]):void => {
    this.asteroids.forEach((asteroid, index) => {
      asteroid.setPos(asteroid.getPos().add(asteroid.getVelocity()));
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
      asteroid.draw();
      bullets.forEach((bullet) => {
        // console.log(`bullet: ${bullet.getPos().x}, ${bullet.getPos().y}`);
        if (asteroid.checkCollision(bullet)) {
          if (asteroid instanceof LargeAsteroid) {
            this.breakUpLargeAsteroid(asteroid, index);
          } else if (asteroid instanceof MediumAsteroid) {
            this.breakUpMediumAsteroid(asteroid, index);
          } else if (asteroid instanceof SmallAsteroid) {
            console.log('small asteroid destroyed');
            this.destroySmallAsteroid(asteroid, index);
          }
        }
      })
    });
    // bullets.forEach((bullet) => {
    //   console.log(`bullet: ${bullet.getPos().x}, ${bullet.getPos().y}`);
    //   this.asteroids.forEach((asteroid) => {
    //     console.log(`asteroid: ${asteroid.getPos().x}, ${asteroid.getPos().y}; active?= ${asteroid.getIsActive()}`);
    //     if (asteroid.checkCollision(bullet)) {
    //       throw(new Error('HIT'));
    //       asteroid.setInactive();
    //     }
    //   });
    // });
  }
}
export default AsteroidController;