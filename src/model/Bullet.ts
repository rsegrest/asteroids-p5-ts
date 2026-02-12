import p5 from 'p5';

export class Bullet {
  private p:p5;
  private pos: p5.Vector;
  private vel: p5.Vector;
  private rot: number;
  private scale = 1;
  private creationTime:number;
  private lifespan = 180;

  constructor(
    p:p5, pos:p5.Vector, vel:p5.Vector, rot:number, creationTime:number) {
    this.p = p;
    this.pos = pos;
    this.vel = vel;
    this.rot = rot;
    this.creationTime = creationTime;
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
    return (this.creationTime + this.lifespan) < this.p.frameCount;
  }

  setPos(newPos:p5.Vector):void {
    this.pos = newPos;
  }
}
export default Bullet;