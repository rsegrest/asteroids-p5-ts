import type p5 from "p5";
import * as AsteroidTypes from "../type/AsteroidType";
import AsteroidController from "./AsteroidController";
import PlayerController from "./PlayerController";
import PlayerShip from "../model/PlayerShip";
import LivesDisplay from "../view/LivesDisplay";
import PlayerDisplay from "../view/PlayerDisplay";
import ScoreDisplay from "../view/ScoreDisplay";
import FooterDisplay from "../view/FooterDisplay";
import BulletDisplay from "../view/BulletDisplay";
import ScoreValues from "../type/ScoreValues";
import AsteroidType from "../type/AsteroidType";
import Explosion from "../model/Explosion";
import SoundManager from "../util/SoundManager";
import SaucerController from "./SaucerController";
import LineDebris from "../model/LineDebris";


class GameController {
  private static instance:GameController|null = null;
  // game controller member variables
  private numLives:number = 3;
  private score:number = 0;
  private lastBonus:number = 0;
  private level:number = 1;
  // p5js Processing reference
  private p:p5;
  // model references
  private pShip:PlayerShip;
  // view references
  private playerDisplay:PlayerDisplay;
  private bulletDisplay:BulletDisplay;
  private footerDisplay:FooterDisplay;
  private scoreDisplay:ScoreDisplay;
  private livesDisplay:LivesDisplay;

  // controller references
  private asteroidController:AsteroidController;
  private saucerController:SaucerController;
  private playerController:PlayerController;
  
  private font: p5.Font;
  private scale:number;
  private playerDebris:LineDebris[] = [];

  private constructor(p:p5, font:p5.Font) {

    this.p = p;
    this.scale = p.width/1200;
    this.pShip = new PlayerShip(p, this.scale);
    this.font = font;
    this.footerDisplay = new FooterDisplay(
      p, font, this.scale
    );
    this.playerDisplay = new PlayerDisplay(p,this.scale);
    this.bulletDisplay = new BulletDisplay(p,this.scale);
    
    this.asteroidController = new AsteroidController(p,this.scale);
    this.saucerController = new SaucerController(p, this.scale); // , this.asteroidController);
    this.playerController = new PlayerController(this.playerDisplay, this.pShip);
    
    this.scoreDisplay = new ScoreDisplay(p, font);
    this.livesDisplay = new LivesDisplay(p);
    this.level = 1;
    this.spawnWave();
  }

  spawnWave():void {
    this.asteroidController.spawnAsteroidWave(this.level);
  }

  moveCCW():void {
    this.getPShip().moveCCW();
  }

  moveCW():void {
    this.getPShip().moveCW();
  }

  addThrust():void {
    this.getPShip().addThrust();
  }

  addBullet():void {
    this.getPShip().addBullet();
  }

  hyperspace():void {
    this.getPShip().hyperspace();
  }

  addAsteroidScore(asteroidType:AsteroidType):void {
    if (
      (asteroidType === AsteroidTypes.LARGE_ASTEROID_1)
      || (asteroidType === AsteroidTypes.LARGE_ASTEROID_2)
      || (asteroidType === AsteroidTypes.LARGE_ASTEROID_3)) {
      this.scoreLargeAsteroid();
    } else if (
      (asteroidType === AsteroidTypes.MEDIUM_ASTEROID_1)
      || (asteroidType === AsteroidTypes.MEDIUM_ASTEROID_2)
      || (asteroidType === AsteroidTypes.MEDIUM_ASTEROID_3)
      ) {
      this.scoreMediumAsteroid();
    } else if (
      (asteroidType === AsteroidTypes.SMALL_ASTEROID_1)
      || (asteroidType === AsteroidTypes.SMALL_ASTEROID_2)
    ) {
      this.scoreSmallAsteroid();
    } else {
      throw(new Error("Error: unknown asteroid type"));
    }
    return;
  }

  scoreLargeAsteroid():void {
    this.rackupScore(ScoreValues.LARGE_ASTEROID);
  }

  scoreMediumAsteroid():void {
    this.rackupScore(ScoreValues.MEDIUM_ASTEROID);
  }

  scoreSmallAsteroid():void {
    this.rackupScore(ScoreValues.SMALL_ASTEROID);
  }

  scoreLargeSaucer():void {
    this.rackupScore(ScoreValues.LARGE_SAUCER);
  }

  scoreSmallSaucer():void {
    this.rackupScore(ScoreValues.SMALL_SAUCER);
  }

  scoreDefeatPlayer():void {
    this.rackupScore(ScoreValues.OTHER_PLAYER_SHIP);
  }

  rackupScore = (score:number):void => {
    this.score += score;
    if (this.score - this.lastBonus >= 10000) {
      this.lastBonus = this.score;
      this.numLives += 1;
    }
  }

  resetScore():void { this.score = 0; }

  checkKeys():void {
    const p = this.p;
    if (p.keyIsDown(p.LEFT_ARROW)) {
      this.moveCCW();
    } else if (p.keyIsDown(p.RIGHT_ARROW)) {
      this.moveCW();
    } else if (p.keyIsDown(p.UP_ARROW)) {
      this.addThrust();
    } else if (p.keyIsDown(32)) {
      this.addBullet();
    }
    
    // Ensure audio context is running on any key interaction
    if (p.keyIsPressed) {
      SoundManager.getInstance().ensureAudioContext();
    }
  }

  canReset():boolean {
    const theAsteroids = this.asteroidController.getAsteroids();
    const spawnPoint = this.p.createVector(this.p.width/2, this.p.height/2);
    for (let i = 0; i < theAsteroids.length; i += 1) {
      if ((theAsteroids[i]?.getDistanceTo(spawnPoint) !== null)
      && (theAsteroids[i]!.getDistanceTo(spawnPoint) < 100)) {
        return false;
      }
    }
    return true;
  }

  advance():void {
    this.checkKeys();

    this.scoreDisplay.draw(this.score);
    this.livesDisplay.draw(this.numLives);
    this.pShip.advance();
    this.asteroidController.advance();
    this.saucerController.advance(this.pShip, this.score);
    this.playerController.advance();
    if (!this.pShip.getIsResetting()) {
      this.playerDisplay.draw(this.pShip);
    } else {
      if (this.canReset()) {
        this.pShip.reset();
      }
    }
    
    this.footerDisplay.draw();
    const collision = this.asteroidController.checkBulletCollisions(this.pShip.getBullets())
    if (collision !== null) {
      this.pShip.removeBullet(collision.bullet, collision.index);
      this.addAsteroidScore(collision.asteroidType);
      this.checkIfLevelComplete();
    }
    const playerCollision = this.asteroidController.checkPlayerCollisions(this.pShip);
    if (playerCollision) {
      const explosionPos = this.pShip.getPos();
      
        this.asteroidController.addExplosion(
          new Explosion(
            this.p,
            explosionPos
          )
        );

        this.createPlayerDebris(explosionPos);

        this.numLives -= 1;
      this.pShip.setIsResetting(true);
      if (this.canReset()) {
        this.pShip.reset();
      }
    }

    if (this.saucerController.checkCollisionWithPlayer(this.pShip)) {
        const explosionPos = this.pShip.getPos();
        this.asteroidController.addExplosion(
          new Explosion(
            this.p,
            explosionPos
          )
        );
        this.numLives -= 1;
        this.pShip.setIsResetting(true);
        if (this.canReset()) {
          this.pShip.reset();
        }
    }

    // Update and draw player debris
    for (let i = this.playerDebris.length - 1; i >= 0; i--) {
        const d = this.playerDebris[i];
        d!.update();
        d!.draw();
        if (d!.isDead()) {
            this.playerDebris.splice(i, 1);
        }
    }
  }

  createPlayerDebris(pos: p5.Vector) {
      const p = this.p;
      const color = '#00FF00';
      const debrisScale = this.scale; // Player debris uses full scale? Or adjusted? 
      // PlayerDisplay uses this.scale for drawing. LineDebris uses scale direct.
      // So passing this.scale is correct. 
      // But wait, LineDebris might not support "scale" affecting the length if I pass length in pixels.
      // In SaucerController I passed `debrisScale` which was `this.scale * 0.3`.
      // The lengths in `createPlayerDebris` should be relative to the ship size.
      // Ship vertices are around -10 to 10.
      
      // Left wing
      this.playerDebris.push(new LineDebris(p, pos.copy().add(-5, 0), p.createVector(Math.random()-0.5, Math.random()-0.5), 15, debrisScale, color));
      // Right wing
      this.playerDebris.push(new LineDebris(p, pos.copy().add(5, 0), p.createVector(Math.random()-0.5, Math.random()-0.5), 15, debrisScale, color));
      // Nose
      this.playerDebris.push(new LineDebris(p, pos.copy().add(0, -5), p.createVector(Math.random()-0.5, Math.random()-0.5), 10, debrisScale, color));
      // Random bits
      for(let i=0; i<3; i++) {
           this.playerDebris.push(new LineDebris(p, pos.copy(), p.createVector(Math.random()*2-1, Math.random()*2-1), 10, debrisScale, color));
      }
  }

  checkIfLevelComplete():void {
    const asteroidLength = this.asteroidController.getNumActiveAsteroids();
    if (asteroidLength === 0) {
      this.level += 1;
      this.asteroidController.spawnAsteroidWave(this.level);
    }
  }
  static createInstance(p:p5, font:p5.Font):GameController {
    if (GameController.instance === null) {
      GameController.instance = new GameController(p, font);
    }
    return GameController.instance;
  }

  static getInstance():GameController|null {
    if (
      (GameController.instance !== null)
      || (GameController.instance !== undefined)
    ) {
      return GameController.instance;
    }
    return null;
  }
  static resetInstance():GameController|null {
    const p = GameController.instance?.p;
    const font = GameController.instance?.font;

    GameController.instance = null;
    GameController.instance = new GameController(p!, font!);

    return GameController.instance;
  }
  getPlayerController():PlayerController {
    return this.playerController;
  }
  getAsteroidController():AsteroidController {
    return this.asteroidController;
  }
  getBulletDisplay():BulletDisplay {
    return this.bulletDisplay;
  }
  getFooterDisplay():FooterDisplay {
    return this.footerDisplay;
  }
  getPlayerDisplay():PlayerDisplay {
    return this.playerDisplay;
  }
  getScoreDisplay():ScoreDisplay {
    return this.scoreDisplay;
  }
  getLivesDisplay():LivesDisplay {
    return this.livesDisplay;
  }
  getScore():number {
    return this.score;
  }
  getNumLives():number {
    return this.numLives;
  }
  setNumLives(numLives:number):void {
    this.numLives = numLives;
  }
  getPShip():PlayerShip {  
    return this.pShip;
  }

}
export default GameController;