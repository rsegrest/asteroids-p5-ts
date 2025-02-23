import Point from "../Point";
import SVGStyle from "../SVGStyle";

export interface SVGArcParams {
  center: Point;
  rx: number;
  ry: number;
  xAxisRotation: number;
  // largeArcFlag: number; // 0 or 1
  // sweepFlag: number; // 0 or 1 "0" = counterclockwise, "1" = clockwise
  // x: number; // end position
  // y: number;
  endPosition: Point;
  style?: SVGStyle | null;
}
export default SVGArcParams;
