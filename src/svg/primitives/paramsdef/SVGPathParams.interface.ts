import Point from "../Point";
import SVGStyle from "../SVGStyle";
// import SVGLine from "../SVGLine";

// M = Move to
// C = Cubic Bezier Curve
// Z = Close Path

export interface SVGPathParams {
  points: Point[];
  style?: SVGStyle | null;
}
export default SVGPathParams;
