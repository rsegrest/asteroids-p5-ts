import p5 from 'p5';
import PlayerDisplay from './PlayerDisplay';
class LivesDisplay {
  private p:p5;
  private scale:number;
  constructor(
    p:p5,
    scale:number = 1,
  ) {
    this.p = p;
    this.scale = scale;
  }
  draw(numLives:number):void {
    const p = this.p;
    p.push();
    for (let i = 0; i < numLives; i++) {
      if (p.frameCount % 3 === 0) {
        p.stroke('#0a0');
        p.strokeWeight((p.frameCount % 2));
        PlayerDisplay.drawPlayer(
          p,
          p.createVector(115+((i*16)*this.scale),(135)*this.scale),
          -p.HALF_PI,
          this.scale,
          '#0a0'
        );  
      }
    }
    p.pop();

  }
}
export default LivesDisplay;