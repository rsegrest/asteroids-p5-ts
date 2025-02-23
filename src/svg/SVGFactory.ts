import SVGArcParams from "./primitives/paramsdef/SVGArcParams.interface";
import SVGBezierCurveParams from "./primitives/paramsdef/SVGBezierCurveParams.interface";
import SVGCircleParams from "./primitives/paramsdef/SVGCircleParams.interface";
import SVGEllipseParams from "./primitives/paramsdef/SVGEllipseParams.interface";
import SVGLineParams from "./primitives/paramsdef/SVGLineParams.interface";
import SVGPolygonParams from "./primitives/paramsdef/SVGPolygonParams.interface";
import SVGRectParams from "./primitives/paramsdef/SVGRectParams.interface";
import Point from "./primitives/Point";
import SVGArc from "./primitives/SVGArc";
import SVGBezierCurve from "./primitives/SVGBezierCurve";
import SVGCircle from "./primitives/SVGCircle";
import SVGEllipse from "./primitives/SVGEllipse";
import SVGLine from "./primitives/SVGLine";
import SVGPolygon from "./primitives/SVGPolygon";
import SVGRect from "./primitives/SVGRect";

export class SVGFactory {
  static createPolygon = (params: SVGPolygonParams): SVGPolygon => {
    return new SVGPolygon(params);
  };
  static createCircle = (params: SVGCircleParams): SVGCircle => {
    return new SVGCircle(params);
  };
  static createLine = (params: SVGLineParams): SVGLine => {
    console.log("Creating line with params: ", params);
    const newLine = new SVGLine(params);
    console.log("Created line: ", newLine);
    return newLine;
  };
  static createEllipse = (params: SVGEllipseParams): SVGEllipse => {
    return new SVGEllipse(params);
  };
  static createArc = (params: SVGArcParams): SVGArc => {
    return new SVGArc(params);
  };
  static createRect = (params: SVGRectParams): SVGRect => {
    return new SVGRect(params);
  };
  static createBezierCurve = (params: SVGBezierCurveParams): SVGBezierCurve => {
    return new SVGBezierCurve(params);
  };
}
export default SVGFactory;
