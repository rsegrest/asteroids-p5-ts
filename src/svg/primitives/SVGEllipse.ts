import Point from "./Point";
import SVGObject from "./SVGObject";
import SVGObjectType from "./SVGObjectTypes";
import SVGStyle from "./SVGStyle";

export class SVGEllipse extends SVGObject {
  private center: Point;
  private rx: number;
  private ry: number;

  constructor(
    center: Point,
    rx: number,
    ry: number,
    style: SVGStyle | null = null
  ) {
    super(SVGObjectType.ELLIPSE, style);
    this.center = center;
    this.rx = rx;
    this.ry = ry;
  }
}
export default SVGEllipse;
