
import p5 from 'p5';
import Asteroid from '../model/Asteroid';

class MediumAsteroid extends Asteroid {
  constructor(
    p:p5,
    initialPos:p5.Vector,
    velocity?:p5.Vector,
  ) {
    super(p, initialPos, 50, velocity);
  }

  draw = ():void => {
    const p = this.getP();
    p.push();
    if (this.active) {
      this.p.stroke(255);
    } else {
      this.p.stroke(255, 0, 0);
    }
    p.noFill();
    p.strokeWeight(2);
    p.translate(
      this.getPos().x,this.getPos().y);
    p.circle(0,0,50);
    p.pop();
  }
  toString():string {
    return `MediumAsteroid: pos: ${this.pos}, velocity: ${this.velocity}`;
  }
}
export default MediumAsteroid;