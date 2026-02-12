import p5 from 'p5';
import PlayerDisplay from './PlayerDisplay';
class LivesDisplay {
  private p:p5;
  constructor(
    p:p5,
  ) {
    this.p = p;
  }
  draw(numLives:number):void {
    const p = this.p;
    p.push();
    for (let i = 0; i < numLives; i++) {
      if (p.frameCount % 3 === 0) {
        p.strokeWeight(p.frameCount % 2)
        p.stroke('#0a0');
        p.strokeWeight((p.frameCount % 3));
        PlayerDisplay.drawPlayer(
          p,
          p.createVector(150+(i*8),125),
          -p.HALF_PI,
          0.2,
          '#0a0'
        );  
        // p.fill('#fff'); // 2f2
        // p.noStroke();
        // PlayerDisplay.drawPlayer(
          // p,
          // p.createVector(150+(i*8),125),
          // -p.HALF_PI,
          // 0.2,
          // '#2f2'
        // );
      }
    }
    p.pop();

  }
}
export default LivesDisplay;