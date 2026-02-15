import p5 from 'p5';
import SaucerModel from '../model/SaucerModel';
class SaucerDisplay {
  private static p:p5;
  private static scale:number = 1;
  constructor(p:p5, scale:number) {
    SaucerDisplay.p = p;
    SaucerDisplay.scale = scale;
  }
  draw(saucer:SaucerModel) {
    if (saucer.getSize() === "LARGE") {
        SaucerDisplay.drawLargeSaucer(saucer);
    } else {
        SaucerDisplay.drawSmallSaucer(saucer);
    }
  }
  
  static draw(saucer:SaucerModel, sizeScale:number) {
    // larger size space ship
    const drawSpaceShip = (p:p5) => {
      p.push();
      p.stroke(0,255,0);
      p.strokeWeight(1);
      p.translate(saucer.getX(), saucer.getY());
      p.scale(SaucerDisplay.scale * sizeScale * 0.3); // Reduce size by 70%
      p.noFill();
      p.quad(-55,7,55,7,25,22,-25,22);
      p.quad(-55,7,55,7,20,-10,-20,-10);
      p.quad(20,-10,-20,-10,-10,-30,10,-30);
      p.pop();
    }
    drawSpaceShip(SaucerDisplay.p);
  }
  static drawLargeSaucer(saucer:SaucerModel) {
    this.draw(saucer, 1.5);
  }
  static drawSmallSaucer(saucer:SaucerModel) {
    this.draw(saucer, 0.7)
  }
}
export default SaucerDisplay;