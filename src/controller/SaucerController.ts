import p5 from 'p5';
import SaucerModel, { SaucerSizeDescription } from '../model/SaucerModel';
import SaucerDisplay from '../view/SaucerDisplay';
import PlayerShip from '../model/PlayerShip';
import Bullet from '../model/Bullet';
import BulletDisplay from '../view/BulletDisplay';
import LineDebris from '../model/LineDebris';
import SoundManager from '../util/SoundManager';
import GameController from './GameController';
import AsteroidController from './AsteroidController';
// import { AsteroidType } from '../type/AsteroidType';

class SaucerController {
  private p:p5;
  private saucer:SaucerModel | null = null;
  private saucerDisplay:SaucerDisplay;
  private scale:number;
  private spawnTimer:number = 0;
//   private asteroidController:AsteroidController;
  private debris:LineDebris[] = [];

  constructor(p:p5, scale:number) {
    this.p = p;
    this.scale = scale;
    //    this.asteroidController = asteroidController;
    this.saucerDisplay = new SaucerDisplay(p, scale);
    this.resetSpawnTimer();
  }

  resetSpawnTimer() {
      // Spawn every 10-20 seconds (at 60fps)
      this.spawnTimer = 600 + Math.random() * 600;
  }

  spawnSaucer(score: number) {
      // Determine size based on score
      // Score > 40000 -> only small saucers
      let size: SaucerSizeDescription;
      if (score >= 40000) {
          size = SaucerSizeDescription.SMALL;
      } else {
          // Otherwise random, but biased towards large
          size = Math.random() > 0.3 ? SaucerSizeDescription.LARGE : SaucerSizeDescription.SMALL;
      }
      
      this.saucer = new SaucerModel(this.p, size, this.scale);
  }

  advance(playerShip: PlayerShip, score: number) {
      // Spawning logic
      if (!this.saucer) {
          if (this.spawnTimer > 0) {
              this.spawnTimer--;
          } else {
              this.spawnSaucer(score);
          }
      }

      // Update active saucer
      if (this.saucer) {
          this.saucer.update(playerShip.getPos(), score);
          this.saucerDisplay.draw(this.saucer);
          
          // Draw bullets
          const bullets = this.saucer.getBullets();
          for (let i = 0; i < bullets.length; i++) {
              BulletDisplay.draw(bullets[i] as Bullet);
          }
          
          if (this.saucer.isToRemove()) {
              this.saucer = null;
              this.resetSpawnTimer();
          } else {
              this.checkCollisions(playerShip);
          }
      }
      
      // Update and draw debris
      for (let i = this.debris.length - 1; i >= 0; i--) {
          const d = this.debris[i];
          d!.update();
          d!.draw();
          if (d!.isDead()) {
              this.debris.splice(i, 1);
          }
      }
  }

  checkCollisions(playerShip: PlayerShip) {
      if (!this.saucer) return;

      // 1. Saucer Bullets vs Player
      const saucerBullets = this.saucer.getBullets();
      for (const bullet of saucerBullets) {
          if (playerShip.checkCollision(bullet)) { // Assuming PlayerShip has checkCollision(Bullet)
              // Player hit logic handled in GameController usually, but trigger here or return event
              // For now, let's assume we can trigger explosion via asteroid controller or similar
              // Actually, GameController handles player death. We need to expose collision check or callback.
          }
      }
      
      // 2. Player Bullets vs Saucer
      const playerBullets = playerShip.getBullets();
      for (let i = 0; i < playerBullets.length; i++) {
          const bullet = playerBullets[i];
          if (bullet && this.checkSaucerCollision(bullet)) {
              playerShip.removeBullet(bullet, i);
              this.destroySaucer(true); // Player killed saucer
              return; 
          }
      }

      // 3. Saucer vs Player Ship
      if (this.checkSaucerCollision(playerShip)) {
           this.destroySaucer(true);
           // Player death needs to be triggered. 
           // We might need a better way to report this up to GameController.
      }
      
      // 4. Saucer vs Asteroids (Optional)
      /*
      const asteroids = this.asteroidController.getAsteroids();
      for (const asteroid of asteroids) {
          if (this.checkSaucerCollision(asteroid)) {
              this.destroySaucer(false);
              // Break asteroid too?
              return;
          }
      }
      */
  }

  checkSaucerCollision(entity: { getPos: () => p5.Vector }): boolean {
      if (!this.saucer) return false;
      const dist = p5.Vector.dist(this.saucer.getPos(), entity.getPos());
      return dist < this.saucer.getCollisionRadius(); // Simple collision
  }
  
  destroySaucer(byPlayer: boolean) {
      if (!this.saucer) return;
      
      if (byPlayer) {
          if (this.saucer.getSize() === SaucerSizeDescription.LARGE) {
              GameController.getInstance()?.scoreLargeSaucer();
          } else {
              GameController.getInstance()?.scoreSmallSaucer();
          }
      }
      
      SoundManager.getInstance().playBangLarge(); // Reuse explosion sound
      
      this.createDebris(this.saucer.getPos());
      
      this.saucer = null;
      this.resetSpawnTimer();
  }

  createDebris(pos: p5.Vector) {
      const p = this.p;
      // Pre-calculate debris scale matching the saucer's visual scale (0.3 of global scale)
      const debrisScale = this.scale * 0.3;
      const color = '#00FF00'; // Green for saucer

      // Create debris segments approximating the saucer shape
      // Top line
      this.debris.push(new LineDebris(p, pos.copy().add(0, -30), p.createVector(Math.random()-0.5, Math.random()-0.5), 20, debrisScale, color));
      // Mid line
      this.debris.push(new LineDebris(p, pos.copy().add(0, -10), p.createVector(Math.random()-0.5, Math.random()-0.5), 40, debrisScale, color));
      // Base line
      this.debris.push(new LineDebris(p, pos.copy().add(0, 7), p.createVector(Math.random()-0.5, Math.random()-0.5), 110, debrisScale, color));
      // Bottom line
      this.debris.push(new LineDebris(p, pos.copy().add(0, 22), p.createVector(Math.random()-0.5, Math.random()-0.5), 50, debrisScale, color));
      
      // Add a few random angled pieces
      for(let i=0; i<4; i++) {
           this.debris.push(new LineDebris(p, pos.copy().add(Math.random()*40-20, Math.random()*20-10), p.createVector(Math.random()*2-1, Math.random()*2-1), 30, debrisScale, color));
      }
  }

  // Helper for GameController to check collisions
  checkCollisionWithPlayer(playerShip: PlayerShip): boolean {
      if (!this.saucer) return false;
      
      // Check saucer body
      if (this.checkSaucerCollision(playerShip)) {
          this.destroySaucer(true); // Count as kill? Or just crash. Let's say crash.
          return true;
      }

      // Check bullets
      const bullets = this.saucer.getBullets();
      for (let i = 0; i < bullets.length; i++) {
          const bullet = bullets[i];
          const dist = p5.Vector.dist(bullet!.getPos(), playerShip.getPos());
           if (dist < 15) { // Player radius approx
               this.saucer.removeBullet(i);
               return true;
           }
      }
      
      return false;
  }
}

export default SaucerController;