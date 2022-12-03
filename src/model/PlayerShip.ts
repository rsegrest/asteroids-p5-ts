import p5 from "p5";

export class Bullet {
  private p:p5;
  private pos: p5.Vector;
  private vel: p5.Vector;
  private rot: number;
  private scale = 1;
  private creationTime:number;
  constructor(
    p:p5, pos:p5.Vector, vel:p5.Vector, rot:number, creationTime:number) {
    this.p = p;
    this.pos = pos;
    this.vel = vel;
    this.rot = rot;
    this.creationTime = creationTime;
  }
  draw():void {
    const p = this.p;
    const scale = this.scale;
    const pos = this.pos;
    const rot = this.rot;
    p.push();
    p.scale(scale);
    p.fill('rgb(255,0,0)');
    p.noStroke();
    // p.translate(pos.x as number, pos.y as number);
    p.translate(this.pos.x as number, this.pos.y as number);
    p.rotate(rot);
    // p.rotate(rot);
    // p.translate(origin[0] as number, origin[1] as number);
    // p.translate(0,-1*(this.creationTime - p.frameCount));
    p.circle(0,0,5);
    p.pop();
  }
}
export class PlayerShip {
  private p:p5;
  private pos:p5.Vector;
  private bullets:Bullet[] = [];
  private rot:number;
  private thrust = 0.5;
  private velocity;
  private scale = 1;

  constructor(p:p5) {
    this.p = p;
    this.rot = 0; // this.p.HALF_PI/2
    this.velocity = this.p.createVector(0,0);
    this.pos = p.createVector(400,400);
    this.bullets.push(new Bullet(
      p,
      this.p.createVector(this.pos.x as number, this.pos.y as number),
      this.p.createVector(1,1),
      0,
      0
    ));
  }
  moveCW():void {
    this.rot += this.p.HALF_PI/20;
  }
  moveCCW():void {
    this.rot -= this.p.HALF_PI/20;
  }
  addThrust():void {
    const thrustVector = this.p.createVector(
      this.thrust * Math.cos(this.rot), this.thrust * Math.sin(this.rot)
    );
    this.velocity.x += thrustVector.x;
    this.velocity.y += thrustVector.y;
  }
  advance():void {
    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;
    if (this.pos.x as number > this.p.width) {
      this.pos.x = 0;
    } else if (this.pos.x as number < 0) {
      this.pos.x = this.p.width;
    }
    if (this.pos.y as number > this.p.height) {
      this.pos.y = 0;
    } else if (this.pos.y as number < 0) {
      this.pos.y = this.p.height;
    }
    this.draw();
    this.velocity.mag() > 0.1 ? this.velocity.mult(0.99) : this.velocity.mult(0);
    
  }

  shoot = (
    p:p5,
    origin:number[] = [400,400],
    rot=p.HALF_PI/2,
    t = 10,
    scale=1,
  ):void => {
    // origin, rot, t
  // ) => {
    // const origin:number[] = [400,400];
    // const rot = p.HALF_PI/2;
    // const t = 10;
    p.push();
    p.scale(scale);
    p.fill(255);
    p.noStroke();
    // p.rotate(rot);
    p.translate(origin[0] as number, origin[1] as number);
    p.rotate(rot);
    // p.translate(origin[0] as number, origin[1] as number);
    p.translate(0,-10*t);
    p.circle(0,0,5);
    p.pop();
  }
  drawAfterBurner():void {
    const p = this.p;
    const rot = this.rot;
    const thrust = this.thrust;

    p.push();
    p.scale(this.scale);
    p.stroke(255);
    p.noFill();
    p.strokeWeight(2);
    p.translate(this.pos.x as number, this.pos.y as number);
    p.rotate(rot);
    p.fill(255);
    p.triangle(-10,-5,-10,5,-15,0);
    p.pop();
  }
  draw():void {
    const isThrusting = (this.thrust > 0);
    const p = this.p;
    const rot = this.rot;

    p.push();
    p.scale(this.scale);
    p.stroke(255);
    p.noFill();
    p.strokeWeight(2);
    p.translate(this.pos.x as number, this.pos.y as number);
    p.rotate(rot);
    p.point(0,0);
    p.quad(20, 0,
      -8,-8,
      -8, 8,
      20,0);
    p.fill(255);
    p.pop();
    if (isThrusting) {
      this.drawAfterBurner();
    }
    for (let i = 0; i < this.bullets.length; i++) {
      console.log(this.bullets[i]);
      (this.bullets[i] as Bullet).draw();
    }
  }
}
export default PlayerShip;