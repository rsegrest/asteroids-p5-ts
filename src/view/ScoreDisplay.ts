import p5 from 'p5';

class ScoreDisplay {
  private p:p5;
  private font:p5.Font;
  constructor(p:p5, font:p5.Font) {
    this.p = p;
    this.font = font;
  }
  draw = (score:number):void => {
    const p = this.p;
    const font = this.font;
    p.push();
    p.translate(10,10);
    if (p.frameCount % 3 === 0) {
      p.strokeWeight(p.frameCount % 2)
      p.fill('#0f0'); // 2f2 / afa
      p.textFont(font);
      p.textSize(16);
      p.text(score.toString(), 100, 100);
    }
    p.pop();
  }
}
export default ScoreDisplay;