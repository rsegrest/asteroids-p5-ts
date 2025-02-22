import SVGRectParams from "./paramsdef/SVGRectParams.interface";
import Point from "./Point";
import SVGArc from "./SVGArc";
import SVGBezierCurve from "./SVGBezierCurve";
import SVGCircle from "./SVGCircle";
import SVGEllipse from "./SVGEllipse";
import SVGLine from "./SVGLine";
import SVGObjectType from "./SVGObjectTypes";
import SVGPolygon from "./SVGPolygon";
import SVGStyle from "./SVGStyle";
import SVGRect from "./SVGRect";
import SVGCircleParams from "./paramsdef/SVGCircleParams.interface";
import SVGEllipseParams from "./paramsdef/SVGEllipseParams";
import SVGLineParams from "./paramsdef/SVGLineParams";
import SVGPolygonParams from "./paramsdef/SVGPolygonParams.interface";

export class SVGObject {
  private style: SVGStyle;

  constructor(
    public readonly type: SVGObjectType,
    // TODO: Create an abstract class for points
    // public readonly points: Point[],
    style: SVGStyle | null = null
  ) {
    this.style = style || {};
  }

  getStyle = (): SVGStyle => {
    return this.style;
  };

  setStyle = (style: SVGStyle): void => {
    this.style = style;
  };

  setFillColor = (fillColor: string): void => {
    this.style.fillColor = fillColor;
  };
  setStrokeColor = (strokeColor: string): void => {
    this.style.strokeColor = strokeColor;
  };
  setStrokeWeight = (strokeWeight: number): void => {
    this.style.strokeWeight = strokeWeight;
  };

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
  static createRect = (params: SVGRectParams): SVGRect => {
    const style = params.style || {};
    return new SVGRect(params.x, params.y, params.width, params.height, style);
  };
  static createBezierCurve = (
    p1: Point,
    cp1: Point,
    cp2: Point,
    p2: Point
  ): SVGBezierCurve => {
    return new SVGBezierCurve(p1, cp1, cp2, p2, {});
  };
}
export default SVGObject;
