import Point from "../Point";
import SVGStyle from "../SVGStyle";

export interface SVGEllipseParams {
  center: Point;
  radiusX: number;
  radiusY: number;
  style?: SVGStyle | null;
}
export default SVGEllipseParams;
