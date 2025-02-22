import { SVGFactory } from "../SVGFactory";
import Point from "./Point";
import SVGObject from "./SVGObject";
import SVGObjectType from "./SVGObjectTypes";
import SVGStyle from "./SVGStyle";

// static createBezierCurve = (x1: number, y1: number,
//  cx1: number, cy1: number, cx2: number, cy2: number,
//  x2: number, y2: number): SVGBezierCurve => {
export class SVGBezierCurve extends SVGObject {
  private p1: Point;
  private p2: Point;
  private cp1: Point;
  private cp2: Point;
  constructor(
    p1: Point,
    cp1: Point,
    cp2: Point,
    p2: Point,
    style: SVGStyle | null = null
  ) {
    super(SVGObjectType.BEZIER_CURVE, style);
    this.p1 = p1;
    this.cp1 = cp1;
    this.cp2 = cp2;
    this.p2 = p2;
  }

  static create = (points: Point[]): SVGBezierCurve => {
    if (!points || points.length !== 4) {
      throw new Error("Invalid number of points for bezier curve");
    }
    if (!points[0] || !points[1] || !points[2] || !points[3]) {
      throw new Error("Invalid points for bezier curve");
    }
    return SVGFactory.createBezierCurve(
      points[0],
      points[1],
      points[2],
      points[3]
    );
  };
}
export default SVGBezierCurve;
// x1: number,
//     y1: number,
//     cx1: number,
//     cy1: number,
//     cx2: number,
//     cy2: number,
//     x2: number,
//     y2: number
//   ): SVGBezierCurve => {
//     return new SVGBezierCurve(
//       new Point(x1, y1),
//       new Point(cx1, cy1),
//       new Point(cx2, cy2),
//       new Point(x2, y2),
