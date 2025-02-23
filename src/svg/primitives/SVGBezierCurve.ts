import { SVGFactory } from "../SVGFactory";
import SVGBezierCurveParams from "./paramsdef/SVGBezierCurveParams.interface";
import Point from "./Point";
import SVGObject from "./SVGObject";
import SVGObjectType from "./SVGObjectTypes";

export class SVGBezierCurve extends SVGObject {
  public p1: Point;
  public p2: Point;
  public cp1: Point;
  public cp2: Point;

  constructor(params: SVGBezierCurveParams) {
    super(SVGObjectType.BEZIER_CURVE, params.style);
    this.p1 = params.p1;
    this.cp1 = params.cp1;
    this.cp2 = params.cp2;
    this.p2 = params.p2;
  }

  static create = (params: SVGBezierCurveParams): SVGBezierCurve => {
    return SVGFactory.createBezierCurve(params);
  };

  toSVGString = (): string => {
    return `M ${this.p1.x} ${this.p1.y} C ${this.cp1.x} ${this.cp1.y} ${this.cp2.x} ${this.cp2.y} ${this.p2.x} ${this.p2.y}`;
  };
  toString = (): string => {
    return `Bezier Curve from (${this.p1.x}, ${this.p1.y}) to (${this.p2.x}, ${this.p2.y}) with control points (${this.cp1.x}, ${this.cp1.y}) and (${this.cp2.x}, ${this.cp2.y})`;
  };
}
export default SVGBezierCurve;
