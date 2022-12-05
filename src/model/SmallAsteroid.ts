import p5 from 'p5';
import Asteroid from './Asteroid';
import AsteroidType from '../type/AsteroidType';
class SmallAsteroid extends Asteroid {
  constructor(
    p:p5,
    initialPos:p5.Vector,
    type:AsteroidType,
    velocity?:p5.Vector,
  ) {
    super(p, initialPos, 25, type, velocity);
  }

  draw = ():void => {
    const p = this.getP();
    const pos = this.getPos();
    p.push();
    if (this.active) {
      this.p.stroke(255);
    } else {
      this.p.stroke(255, 0, 0);
    }
    p.noFill();
    p.strokeWeight(2);
    p.translate(pos.x, pos.y);
    p.circle(0,0,25);
    p.pop();
  }
  toString():string {
    return `SmallAsteroid: pos: ${this.pos}, velocity: ${this.velocity}`;
  }
}
export default SmallAsteroid;