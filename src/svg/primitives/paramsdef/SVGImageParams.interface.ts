import Point from "../Point";
import SVGStyle from "../SVGStyle";

// M = Move to
// C = Cubic Bezier Curve
// Z = Close Path

export interface SVGImageParams {
  href: string;
  width: number;
  height: number;
  position: Point;
  style?: SVGStyle | null;
}
export default SVGImageParams;
