import p5 from "p5";

class LineDebris {
  private p: p5;
  private pos: p5.Vector;
  private vel: p5.Vector;
  private rot: number;
  private rotSpeed: number;
  private length: number;
  private life: number = 120; // 2 seconds at 60fps
  private scale: number;
  private color: string | number[];

  constructor(p: p5, pos: p5.Vector, vel: p5.Vector, length: number, scale: number, color: string | number[]) {
    this.p = p;
    this.pos = pos.copy();
    this.vel = vel.copy();
    this.rot = p.random(p.TWO_PI);
    this.rotSpeed = p.random(-0.1, 0.1);
    this.length = length;
    this.scale = scale;
    this.color = color;
  }

  update(): void {
    this.pos.add(this.vel);
    this.rot += this.rotSpeed;
    this.life--;
  }

  draw(): void {
    const p = this.p;
    p.push();
    p.translate(this.pos.x, this.pos.y);
    p.rotate(this.rot);
    p.scale(this.scale); // Use the provided scale directly
    p.stroke(this.color as any);
    p.strokeWeight(2); // This will be affected by scale if I scale before? 
    // usually we want stroke weight to be consistent screen pixels or relative?
    // p5.strokeWeight is affected by scale.
    
    p.line(-this.length / 2, 0, this.length / 2, 0);
    p.pop();
  }

  isDead(): boolean {
    return this.life <= 0;
  }
}

export default LineDebris;
