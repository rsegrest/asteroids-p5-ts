import p5 from "p5";
import Bullet from './Bullet';
export class PlayerShip {
  private p:p5;
  private pos:p5.Vector;
  private bullets:Bullet[] = [];
  private rot:number;
  private thrust = 0.5;
  private velocity;
  private scale = 1;
  private coolDown = 0; // wait before firing again
  private isResetting = false;

  constructor(p:p5) {
    this.p = p;
    this.rot = 0; // this.p.HALF_PI/2
    this.velocity = this.p.createVector(0,0);
    this.pos = p.createVector(400,400);
  }

  getBullets():Bullet[] {
    return this.bullets;
  }
  removeBullet(bullet:Bullet, index:number):void {
    this.bullets.splice(index, 1);
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
  hyperspace():void {
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.pos.x = Math.random()*this.p.width;
    this.pos.y = Math.random()*this.p.height;
  }
  addBullet():void {
    if (this.coolDown === 0) {
      this.bullets.push(new Bullet(
        this.p,
        this.p.createVector(this.pos.x as number, this.pos.y as number),
        this.p.createVector(
          Math.cos(this.rot)*5,
          Math.sin(this.rot)*5),
        this.rot,
        this.p.frameCount,
      ));
      this.coolDown = 16;
    }
  }
  getPos():p5.Vector {
    return this.pos;
  }
  getRot():number {
    return this.rot;
  }
  getScale():number {
    return this.scale;
  }
  getColor():string {
    return '#00FF00';
  }
  reset():void {
    this.pos = this.p.createVector(this.p.width/2, this.p.height/2);
    this.rot = 0;
    this.velocity = this.p.createVector(0,0);
    this.isResetting = false;
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
    this.velocity.mag() > 0.1 ? this.velocity.mult(0.99) : this.velocity.mult(0);
    for (let i = 0; i < this.bullets.length; i++) {
      const thisBullet = (this.bullets[i] as Bullet);
      thisBullet.setPos(thisBullet.getPos().add(thisBullet.getVel()));
    }
    if (this.coolDown > 0) {
      this.coolDown -= 1;
    }
  }
  setIsResetting(isResetting:boolean):void {
    this.isResetting = isResetting;
  }
  getIsResetting():boolean {
    return this.isResetting;
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
}
export default PlayerShip;