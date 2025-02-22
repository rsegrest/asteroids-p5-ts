import Point from "./Point";
import SVGObject from "./SVGObject";
import SVGObjectType from "./SVGObjectTypes";
import SVGStyle from "./SVGStyle";

export class SVGArc extends SVGObject {
  private center: Point;
  private radius: number;
  private startAngle: number;
  private endAngle: number;

  constructor(
    center: Point,
    radius: number,
    startAngle: number,
    endAngle: number,
    style: SVGStyle | null = null
  ) {
    super(SVGObjectType.ARC, style);
    this.center = center;
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
  }
}
export default SVGArc;
