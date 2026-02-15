import p5 from 'p5';
import Bullet from './Bullet';
import SoundManager from '../util/SoundManager';

export const SaucerSizeDescription = {
  SMALL: 'SMALL',
  LARGE: 'LARGE',
} as const;

export const SaucerSizeRadius = {
  SMALL: 20, // Doubled from 10
  LARGE: 40, // Doubled from 20
} as const;

export type SaucerSizeDescription = typeof SaucerSizeDescription[keyof typeof SaucerSizeDescription];

class SaucerModel {
  private p:p5;
  private sizeDescription:SaucerSizeDescription;
  private sizeRadius:number;
  private position:p5.Vector;
  private velocity:p5.Vector;
  private bullets:Bullet[] = [];
  private toRemove:boolean = false;
  private shootCooldown:number = 0;
  private scale:number;

  constructor(
    p:p5,
    size:SaucerSizeDescription,
    scale:number
  ) {
    this.p = p;
    this.sizeDescription = size;
    this.sizeRadius = SaucerSizeRadius[size];
    this.scale = scale;
    
    // Spawn logic: always spawns on left or right edge
    const isLeft = Math.random() > 0.5;
    this.position = p.createVector(
        isLeft ? 0 : p.width,
        Math.random() * p.height
    );
    
    // Move horizontally across
    this.velocity = p.createVector(
        isLeft ? 2 : -2,
        (Math.random() - 0.5) // Slight vertical drift
    );

    if (this.sizeDescription === SaucerSizeDescription.LARGE) {
        SoundManager.getInstance().playSaucerLarge();
    } else {
        SoundManager.getInstance().playSaucerSmall();
    }
  }

  update(playerPos: p5.Vector, score: number) {
      this.position.add(this.velocity);
      
      // Wrap vertical
      if (this.position.y < 0) this.position.y += this.p.height;
      if (this.position.y > this.p.height) this.position.y -= this.p.height;

      // Remove if off screen horizontally
      if (this.position.x < 0 || this.position.x > this.p.width) {
          this.toRemove = true;
      }

      // Shooting logic
      if (this.shootCooldown > 0) {
          this.shootCooldown--;
      } else {
          this.shoot(playerPos, score);
          // Random cooldown between 2-4 seconds (at 60fps)
          this.shootCooldown = 120 + Math.random() * 120; 
      }

      // Update bullets
      for (let i = this.bullets.length - 1; i >= 0; i--) {
        const bullet = this.bullets[i];
        bullet!.update();
        if (bullet!.checkIfDead()) {
            this.bullets.splice(i, 1);
        }
    }
  }

  shoot(playerPos: p5.Vector, score: number) {
      const p = this.p;
      let rot = 0;

      if (this.sizeDescription === SaucerSizeDescription.LARGE) {
          // Random direction
          rot = Math.random() * p.TWO_PI;
      } else {
          // Aim at player with error based on score
          const angleToPlayer = p5.Vector.sub(playerPos, this.position).heading();
          
          // Accuracy improves as score increases
          // Score 0 -> +/- 45 degrees error (PI/4)
          // Score 40000 -> 0 degrees error
          const accuracyFactor = Math.min(score, 40000) / 40000;
          const maxError = p.PI / 4 * (1 - accuracyFactor); 
          const error = (Math.random() - 0.5) * 2 * maxError;
          
          rot = angleToPlayer + error;
      }

      this.bullets.push(new Bullet(
          p,
          this.position.copy(),
          p.createVector(Math.cos(rot) * 4, Math.sin(rot) * 4), // Slower than player bullets
          rot,
          'saucer'
      ));
      
      SoundManager.getInstance().playFire();
  }

  getBullets():Bullet[] {
      return this.bullets;
  }

  removeBullet(index:number) {
      this.bullets.splice(index, 1);
  }

  getX():number {
    return this.position.x;
  }

  getY():number {
    return this.position.y;
  }
  
  getPos():p5.Vector {
      return this.position;
  }

  getSize():SaucerSizeDescription {
    return this.sizeDescription;
  }

  isToRemove():boolean {
      return this.toRemove;
  }
  
  getCollisionRadius():number {
      return this.sizeRadius * this.scale;
  }
}
export default SaucerModel;