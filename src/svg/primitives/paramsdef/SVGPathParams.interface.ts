import SVGLine from "../SVGLine";
import SVGStyle from "../SVGStyle";

// M = Move to
// C = Cubic Bezier Curve
// Z = Close Path

export interface SVGPathParams {
  lines: SVGLine[];
  style?: SVGStyle | null;
}
export default SVGPathParams;
