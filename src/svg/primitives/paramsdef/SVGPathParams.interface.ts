import Point from "../Point";
import SVGArc from "../SVGArc";
import SVGLine from "../SVGLine";
import SVGStyle from "../SVGStyle";
// import SVGLine from "../SVGLine";

// M = Move to
// C = Cubic Bezier Curve
// Z = Close Path

export interface SVGPathParams {
  points?: Point[];
  lines?: SVGLine[];
  arcs?: SVGArc[];
  style?: SVGStyle | null;
}
export default SVGPathParams;
