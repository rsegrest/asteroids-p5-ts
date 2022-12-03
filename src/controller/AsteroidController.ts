import p5 from 'p5';
import Asteroid from '../model/Asteroid';

class AsteroidController {
  private p:p5;
  private asteroids:Asteroid[];
  constructor (p:p5) {
    this.p = p;
    this.asteroids = [];
  }

}
export default AsteroidController;