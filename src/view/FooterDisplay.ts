import p5 from 'p5';
class FooterDisplay {
  private p:p5;
  private font:p5.Font;
  private scale:number;

  constructor(
    p:p5,
    font:p5.Font,
    scale:number = 1,
  ) {
    this.p = p;
    this.font = font;
    this.scale = scale;
  }
  draw() {
    const p = this.p;
    if (this.p.frameCount % 3 !== 0) {
      const font = this.font;
      p.fill('rgb(0,128,0)');
      p.noStroke();
      p.textFont(font);
      p.textSize(12);
      p.text('© 2023 Rick Segrest', (p.width/2)-72, p.height*.95);
    }
  }
}
export default FooterDisplay;