
import p5 from 'p5';

class Asteroid {
  p:p5;
  pos:p5.Vector;
  velocity:p5.Vector;
  constructor(
    p:p5,
    initialPos = p.createVector(100,100),
    velocity?:p5.Vector,
  ) {
    this.p = p;
    this.pos = initialPos;
    if (velocity) {
      this.velocity = velocity;
    } else {
      this.velocity = p.createVector(
        Math.random()*1,
        Math.random()*1
      );
    }
  }
  getP():p5 {
    return this.p;
  }
  getPos():p5.Vector {
    return this.pos;
  }
  getVelocity():p5.Vector {
    return this.velocity;
  }
  setPos(newPos:p5.Vector):void {
    this.pos = newPos;
  }
  setVelocity(newVelocity:p5.Vector):void {
    this.velocity = newVelocity;
  }


  draw = ():void => {
    throw(new Error('Override this method'));
  }
}
export default Asteroid;