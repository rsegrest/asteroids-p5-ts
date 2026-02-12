import p5 from 'p5';

class ScoreDisplay {
  private p:p5;
  private font:p5.Font;
  private scale:number;
  constructor(p:p5, font:p5.Font, scale:number = 1) {
    this.p = p;
    this.font = font;
    this.scale = scale;
  }
  draw = (score:number):void => {
    const p = this.p;
    const font = this.font;
    p.push();
    p.translate(10*this.scale,10*this.scale);
    if (p.frameCount % 3 === 0) {
      p.strokeWeight((p.frameCount % 2)*(this.scale*1.5))
      p.fill('#0f0'); // 2f2 / afa
      p.textFont(font);
      p.textSize(20*this.scale);
      p.text(score.toString(), 100*this.scale, 100*this.scale);
    }
    p.pop();
  }
}
export default ScoreDisplay;