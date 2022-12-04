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
  
  // draw():void {
  //   const p = this.p;
  //   const scale = this.scale;
  //   const pos = this.pos;
  //   const rot = this.rot;
  //   p.push();
  //   p.scale(scale);
  //   if (this.checkIfDead()) {
  //     p.fill('rgb(0,128,255)');
  //   } else {
  //     p.fill('rgb(255,0,0)');
  //   }
  //   p.noStroke();
  //   // p.translate(pos.x as number, pos.y as number);
  //   p.translate(pos.x as number, pos.y as number);
  //   p.rotate(rot);
  //   // p.rotate(rot);
  //   // p.translate(origin[0] as number, origin[1] as number);
  //   // p.translate(0,-1*(this.creationTime - p.frameCount));
  //   p.circle(0,0,5);
  //   p.pop();
  // }
}
export default Bullet;