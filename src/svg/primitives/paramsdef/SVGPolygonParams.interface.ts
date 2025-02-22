import Point from "../Point";
import SVGStyle from "../SVGStyle";

export interface SVGPolygonParams {
  points: Point[];
  style?: SVGStyle | null;
}
export default SVGPolygonParams;
