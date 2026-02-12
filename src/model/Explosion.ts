import p5 from "p5";

export class Particle {
  private p:p5;
  private position:p5.Vector;
  private velocity:p5.Vector;
  private lifespan:number;
  constructor(
    p:p5,
    position:p5.Vector
  ) {
    let velx = Math.random()*2-1;
    let vely = Math.random()*2-1;
    this.p = p;
    this.position = position;
    this.velocity = p.createVector(velx, vely);
    this.lifespan = 100;
  }
  advance():void {
    this.lifespan -= 1;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
  getPos():p5.Vector {
    return this.position;
  }
  getVel():p5.Vector {
    return this.velocity;
  }
  getLifespan():number {
    return this.lifespan;
  }
  toString():string {
    return `Particle: pos: ${this.position}, vel: ${this.velocity}, lifespan: ${this.lifespan}`;
  }
}

class Explosion {
  private p:p5;
  private pos:p5.Vector;
  private lifespan = 60;
  private particles:Particle[] = [];
  constructor(
    p:p5,
    pos:p5.Vector,
  ) {
    this.p = p;
    this.pos = this.normalizePosition(pos);
    for (let i = 0; i < 30; i += 1) {
      const newParticle = new Particle(
        this.p,
        this.pos.copy()
      )
      this.particles.push(newParticle);
    }
  }
  normalizePosition(pos:p5.Vector):p5.Vector {
    const p = this.p;
    let explosionPosition = pos;
    while (explosionPosition.x < 0) {
      explosionPosition.x += p.width;
    }
    while (explosionPosition.y < 0) {
      explosionPosition.y += p.height;
    }
    while (explosionPosition.x > p.width) {
      explosionPosition.x -= p.width;
    }
    while (explosionPosition.y > p.height) {
      explosionPosition.y -= p.height;
    }
    return explosionPosition;
  }
  // return true if still going
  advance():boolean {
    for (let i = 0; i < this.particles.length; i += 1) {
      (this.particles[i] as Particle).advance();
    }
    this.lifespan -= 1;
    if (this.lifespan <= 0) {
      return false;
    }
    return true;
  }
  getParticles():Particle[] {
    return this.particles;
  }
  getPos():p5.Vector {
    return this.pos;
  }
  toString():string {
    return `Explosion: pos: ${this.pos}, lifespan: ${this.lifespan}`;
  }
}
export default Explosion;