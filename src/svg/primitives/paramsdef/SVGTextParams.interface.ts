import SVGArc from "../SVGArc";
import SVGBezierCurve from "../SVGBezierCurve";
import SVGLine from "../SVGLine";
import SVGPath from "../SVGPath";
import SVGStyle from "../SVGStyle";

export interface SVGTextParams {
  x: number;
  y: number;
  content: string;
  path?: SVGPath | SVGLine | SVGArc | SVGBezierCurve | null;
  style?: SVGStyle | null;
}
export default SVGTextParams;
