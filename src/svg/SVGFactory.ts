import SVGCircleParams from "./primitives/paramsdef/SVGCircleParams.interface";
import SVGEllipseParams from "./primitives/paramsdef/SVGEllipseParams";
import SVGLineParams from "./primitives/paramsdef/SVGLineParams";
import SVGPolygonParams from "./primitives/paramsdef/SVGPolygonParams.interface";
import SVGRectParams from "./primitives/paramsdef/SVGRectParams.interface";
import Point from "./primitives/Point";
import SVGArc from "./primitives/SVGArc";
import SVGBezierCurve from "./primitives/SVGBezierCurve";
import SVGCircle from "./primitives/SVGCircle";
import SVGEllipse from "./primitives/SVGEllipse";
import SVGLine from "./primitives/SVGLine";
import SVGPolygon from "./primitives/SVGPolygon";

export class SVGFactory {
  static createPolygon = (params: SVGPolygonParams): SVGPolygon => {
    return new SVGPolygon(params.points, params.style || {});
  };
  static createCircle = (params: SVGCircleParams): SVGCircle => {
    return new SVGCircle(params.center, params.radius, params.style);
  };
  static createLine = (params: SVGLineParams): SVGLine => {
    return new SVGLine(params.p1, params.p2, params.style);
  };
  static createEllipse = (params: SVGEllipseParams): SVGEllipse => {
    return new SVGEllipse(
      params.center,
      params.radiusX,
      params.radiusY,
      params.style
    );
  };
  static createArc = (params: SVGCircleParams): SVGArc => {
    const startAngle = params.startAngle || 0;
    const endAngle = params.endAngle || 2 * Math.PI;
    const style = params.style || {};
    return new SVGArc(
      params.center,
      params.radius,
      startAngle,
      endAngle,
      style
    );
  };
  // TODO: Replace arguments with interface
  static createRect = (params: SVGRectParams): SVGRect => {
    const style = params.style || {};
    return new SVGRect(params.x, params.y, params.width, params.height);
  };
  // TODO: Replace arguments with interface
  static createBezierCurve = (
    p1: Point,
    cp1: Point,
    cp2: Point,
    p2: Point
  ): SVGBezierCurve => {
    return new SVGBezierCurve(p1, cp1, cp2, p2, {});
  };
}
