
import p5 from 'p5';
import Asteroid from '../model/Asteroid';

class MediumAsteroid extends Asteroid {
  constructor(
    p:p5,
    initialPos = p.createVector(100,100),
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
}
export default MediumAsteroid;