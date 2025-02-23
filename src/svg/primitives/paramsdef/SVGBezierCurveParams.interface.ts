import Point from "../Point";
import SVGStyle from "../SVGStyle";

export interface SVGBezierCurveParams {
  p1: Point;
  cp1: Point;
  cp2: Point;
  p2: Point;
  style?: SVGStyle | null;
}
export default SVGBezierCurveParams;
