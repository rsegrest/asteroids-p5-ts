import Point from "./Point";
import SVGObject from "./SVGObject";
import SVGObjectType from "./SVGObjectTypes";
import SVGStyle from "./SVGStyle";

export class SVGCircle extends SVGObject {
  public center: Point;
  public radius: number;

  constructor(center: Point, radius: number, style: SVGStyle | null = null) {
    super(SVGObjectType.CIRCLE, style);
    this.center = center;
    this.radius = radius;
  }
}
export default SVGCircle;
