import p5 from 'p5';

export class Bullet {
  private p:p5;
  private pos: p5.Vector;
  private vel: p5.Vector;
  private rot: number;
  private scale = 1;
  private distTravelled = 0;
  private maxDist:number;
  private owner: 'player' | 'saucer';

  constructor(
    p:p5, pos:p5.Vector, vel:p5.Vector, rot:number, owner: 'player' | 'saucer' = 'player') {
    this.p = p;
    this.pos = pos;
    this.vel = vel;
    this.rot = rot;
    this.maxDist = p.width;
    this.owner = owner;
  }

  getOwner(): 'player' | 'saucer' {
    return this.owner;
  }

  getPos():p5.Vector {
    return this.pos;
  }

  getRot():number {
    return this.rot;
  }

  getVel():p5.Vector {
    return this.vel;
  }

  checkIfDead():boolean {
    return this.distTravelled >= this.maxDist;
  }

  update():void {
    this.pos.add(this.vel);
    this.distTravelled += this.vel.mag();

    if (this.pos.x > this.p.width) {
      this.pos.x = 0;
    } else if (this.pos.x < 0) {
      this.pos.x = this.p.width;
    }

    if (this.pos.y > this.p.height) {
      this.pos.y = 0;
    } else if (this.pos.y < 0) {
      this.pos.y = this.p.height;
    }
  }

  setPos(newPos:p5.Vector):void {
    this.pos = newPos;
  }
}
export default Bullet;