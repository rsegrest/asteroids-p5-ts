import Point from "../Point";
import SVGStyle from "../SVGStyle";

export interface SVGCircleParams {
  center: Point;
  radius: number;
  startAngle?: number;
  endAngle?: number;
  style?: SVGStyle | null;
}
export default SVGCircleParams;
