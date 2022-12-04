import p5 from 'p5';
class FooterDisplay {
  private p:p5;
  private font:p5.Font;
  // private pos:p5.Vector;
  private scale:number;

  constructor(
    p:p5,
    font:p5.Font,
    // pos:p5.Vector,
    scale:number = 1,
  ) {
    this.p = p;
    this.font = font;
    // this.pos = pos;
    this.scale = scale;
  }
  draw() {
    const p = this.p;
    const font = this.font;
    p.fill('#2f2');
    p.textFont(font);
    p.textSize(12);
    p.text('© 2023 Rick Segrest', 300, 500);
  }
}
export default FooterDisplay;