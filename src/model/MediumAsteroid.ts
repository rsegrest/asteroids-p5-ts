
import p5 from 'p5';
import Asteroid from '../model/Asteroid';
import { AsteroidType } from '../type/AsteroidType';
class MediumAsteroid extends Asteroid {
  constructor(
    p:p5,
    initialPos:p5.Vector,
    type:AsteroidType,
    scale:number,
    velocity?:p5.Vector,
  ) {
    super(p, initialPos, 50*scale, type, velocity);
  }

  toString():string {
    return `MediumAsteroid: pos: ${this.pos}, velocity: ${this.velocity}`;
  }
}
export default MediumAsteroid;