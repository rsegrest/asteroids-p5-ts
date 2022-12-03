
import p5 from 'p5';
import Asteroid from '../model/Asteroid';

class LargeAsteroid extends Asteroid {
  constructor(
    p:p5,
    initialPos = p.createVector(100,100),
    velocity?:p5.Vector,
  ) {
    super(p, initialPos, velocity);
  }

  draw = ():void => {
    this.p.push();
    this.p.stroke(255);
    this.p.noFill();
    this.p.strokeWeight(2);
    this.p.translate(
      this.pos.x,this.pos.y);
    this.p.circle(0,0,100);
    this.p.pop();
  }
}
export default LargeAsteroid;