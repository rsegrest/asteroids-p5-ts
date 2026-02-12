
import p5 from 'p5';
import Bullet from './Bullet';
import PlayerShip from './PlayerShip';
import { AsteroidType } from '../type/AsteroidType';

class Asteroid {
  p:p5;
  pos:p5.Vector;
  velocity:p5.Vector;
  type:AsteroidType;
  active:boolean;
  size:number;

  constructor(
    p:p5,
    initialPos:p5.Vector,
    size:number,
    type:AsteroidType,
    velocity?:p5.Vector,
  ) {
    this.p = p;
    this.pos = initialPos;
    this.size = size;
    this.active = true;
    if (velocity) {
      this.velocity = velocity;
    } else {
      this.velocity = p.createVector(
        Math.random()*1,
        Math.random()*1
      );
    }
    this.type = type;
  }

  getP():p5 {
    return this.p;
  }
  
  getPos():p5.Vector {
    return this.pos;
  }
  
  getVelocity():p5.Vector {
    return this.velocity;
  }
  
  getIsActive():boolean {
    return this.active;
  }
  
  setInactive():void {
    this.active = false;
  }
  
  setPos(newPos:p5.Vector):void {
    this.pos = newPos;
  }
  
  setVelocity(newVelocity:p5.Vector):void {
    this.velocity = newVelocity;
  }
  
  getDistanceTo(point:p5.Vector):number {
    return this.pos.dist(point);
  }
  
  getCollisionRadius():number {
    return this.size/2;
  }
  
  getType():AsteroidType {
    return this.type;
  }

  checkCollision(collider:Bullet|PlayerShip):boolean {
    const distance = this.getDistanceTo(collider.getPos());
    const collisionRadius = this.getCollisionRadius();
    return distance < collisionRadius;
  }

  draw = ():void => {
    throw(new Error('Override this method'));
  }
}
export default Asteroid;