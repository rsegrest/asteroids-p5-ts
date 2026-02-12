
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
  
  toString():string {
    return `LargeAsteroid: pos: ${this.pos}, velocity: ${this.velocity}`;
  }
}
export default LargeAsteroid;