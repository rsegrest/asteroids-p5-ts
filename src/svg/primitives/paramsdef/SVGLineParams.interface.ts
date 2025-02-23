import Point from "../Point";
import SVGStyle from "../SVGStyle";

export interface SVGLineParams {
  p1: Point;
  p2: Point;
  style?: SVGStyle | null;
}
export default SVGLineParams;
