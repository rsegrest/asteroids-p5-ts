import p5 from 'p5';
export const SaucerSize = {
  SMALL: 'SMALL',
  LARGE: 'LARGE',
}
export type SaucerSize = typeof SaucerSize.SMALL | typeof SaucerSize.LARGE;
class SaucerModel {
  private p:p5;
  private size:SaucerSize;
  private position:p5.Vector;
  private path:p5.Vector[];
  // TODO: For large saucer: random shots or planned on creation?
  constructor(
    p:p5,
    size:SaucerSize,
    position:p5.Vector,
    path:p5.Vector[]
  ) {
    this.p = p;
    this.size = size;
    this.position = position;
    this.path = path;
  }
  getX():number {
    return this.position.x;
  }
  getY():number {
    return this.position.y;
  }
  getSize():SaucerSize {
    return this.size;
  }
  getPath():p5.Vector[] {
    return this.path;
  }
}
export default SaucerModel;