
import p5 from 'p5';
import Asteroid from '../model/Asteroid';
import { AsteroidType } from '../type/AsteroidType';
class LargeAsteroid extends Asteroid {
  constructor(
    p:p5,
    initialPos:p5.Vector,
    type:AsteroidType,
    velocity?:p5.Vector,
  ) {
    super(p, initialPos, 100, type, velocity);
  }
  // draw = ():void => {
  //   const p = this.getP();
  //   const pos = this.getPos();
  //   if (p) {
  //     p.push();
  //     if (this.active) {
  //       p.stroke(255);
  //     } else {
  //       p.stroke(255, 0, 0);
  //     }
  //     p.noFill();
  //     p.strokeWeight(2);
  //     p.translate(
  //       pos.x,pos.y);
  //     p.circle(0,0,100);
  //     p.pop();
  //   }
  // }
  toString():string {
    return `LargeAsteroid: pos: ${this.pos}, velocity: ${this.velocity}`;
  }
}
export default LargeAsteroid;