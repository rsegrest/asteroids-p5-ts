import SVGObject from "./SVGObject";
import SVGObjectType from "./SVGObjectTypes";
import SVGStyle from "./SVGStyle";

export class SVGRect extends SVGObject {
  public x: number;
  public y: number;
  public width: number;
  public height: number;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    style: SVGStyle | null = null
  ) {
    super(SVGObjectType.RECT, style);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}
export default SVGRect;
