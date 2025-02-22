import { Point } from "./Point";
import SVGObject from "./SVGObject";
import SVGObjectType from "./SVGObjectTypes";
import SVGStyle from "./SVGStyle";

export class SVGLine extends SVGObject {
  private p1: Point;
  private p2: Point;

  constructor(p1: Point, p2: Point, style: SVGStyle | null = null) {
    super(SVGObjectType.LINE, style);
    this.p1 = p1;
    this.p2 = p2;
  }
}
export default SVGLine;
