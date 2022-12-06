import type p5 from "p5";
import AsteroidController from "./AsteroidController";
import PlayerController from "./PlayerController";
import PlayerShip from "../model/PlayerShip";
import LivesDisplay from "../view/LivesDisplay";
import PlayerDisplay from "../view/PlayerDisplay";
import ScoreDisplay from "../view/PlayerScoreDisplay";
import FooterDisplay from "../view/FooterDisplay";
import BulletDisplay from "../view/BulletDisplay";

class GameController {
  private static instance:GameController|null = null;
  // game controller member variables
  private numLives:number = 3;
  private score:number = 0;
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
  private playerController:PlayerController;
  
  // other
  private font: p5.Font;

  private constructor(p:p5, font:p5.Font) {

    this.p = p;
    this.pShip = new PlayerShip(p);
    this.font = font;
    this.footerDisplay = new FooterDisplay(
      p, font, 0.5
    );
    this.playerDisplay = new PlayerDisplay(p,0.5);
    this.bulletDisplay = new BulletDisplay(p);
    
    this.asteroidController = new AsteroidController(p);
    this.playerController = new PlayerController(this.playerDisplay, this.pShip);
    
    this.scoreDisplay = new ScoreDisplay(p, font);
    this.livesDisplay = new LivesDisplay(p);
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

  rackupScore = (score:number):void => {
    this.score += score;
  }

  resetScore = ():void => { this.score = 0; }

  checkKeys = () => {
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
  }

  advance():void {
    this.checkKeys();

    this.scoreDisplay.draw(this.score);
    this.livesDisplay.draw(this.numLives);
    this.pShip.advance();
    this.asteroidController.advance();
    this.playerController.advance();
    this.playerDisplay.draw(this.pShip);
    this.footerDisplay.draw();
    const bullet = this.asteroidController.checkBulletCollisions(this.pShip.getBullets())
    if (bullet !== null) {
      const explosionPos = bullet.bullet.getPos();
      this.pShip.removeBullet(bullet.bullet, bullet.index);
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