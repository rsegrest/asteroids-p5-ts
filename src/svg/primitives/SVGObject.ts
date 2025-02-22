import type SVGRectParams from "./paramsdef/SVGRectParams.interface";
import Point from "./Point";
import type SVGArc from "./SVGArc";
import type SVGBezierCurve from "./SVGBezierCurve";
import type SVGCircle from "./SVGCircle";
import type SVGEllipse from "./SVGEllipse";
import type SVGLine from "./SVGLine";
import type SVGObjectType from "./SVGObjectTypes";
import type SVGPolygon from "./SVGPolygon";
import type SVGStyle from "./SVGStyle";
import type SVGRect from "./SVGRect";
import type SVGCircleParams from "./paramsdef/SVGCircleParams.interface";
import type SVGEllipseParams from "./paramsdef/SVGEllipseParams";
import type SVGLineParams from "./paramsdef/SVGLineParams";
import type SVGPolygonParams from "./paramsdef/SVGPolygonParams.interface";

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
}
export default SVGObject;
