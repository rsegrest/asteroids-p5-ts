import p5 from 'p5';
import Asteroid from './Asteroid';
import AsteroidType from '../type/AsteroidType';
class SmallAsteroid extends Asteroid {

  constructor(
    p:p5,
    initialPos:p5.Vector,
    type:AsteroidType,
    scale:number,
    velocity?:p5.Vector,
  ) {
    super(p, initialPos, 25*scale, type, velocity);
  }

  toString():string {
    return `SmallAsteroid: pos: ${this.pos}, velocity: ${this.velocity}`;
  }
}
export default SmallAsteroid;