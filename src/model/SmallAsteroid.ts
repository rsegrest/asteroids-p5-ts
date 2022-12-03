import p5 from 'p5';
import Asteroid from './Asteroid';

class SmallAsteroid extends Asteroid {
  constructor(
    p:p5,
    initialPos = p.createVector(100,100),
    velocity?:p5.Vector,
  ) {
    super(p, initialPos, 25, velocity);
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
    p.translate(300, 300);
    p.circle(0,0,25);
    p.pop();
  }
}
export default SmallAsteroid;