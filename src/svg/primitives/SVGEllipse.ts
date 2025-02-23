import SVGEllipseParams from "./paramsdef/SVGEllipseParams.interface";
import Point from "./Point";
import SVGObject from "./SVGObject";
import SVGObjectType from "./SVGObjectTypes";

export class SVGEllipse extends SVGObject {
  public center: Point;
  public radiusX: number;
  public radiusY: number;

  constructor(
    params: SVGEllipseParams
    // center: Point,
    // rx: number,
    // ry: number,
    // style: SVGStyle | null = null
  ) {
    super(SVGObjectType.ELLIPSE, params.style);
    this.center = params.center;
    this.radiusX = params.radiusX;
    this.radiusY = params.radiusY;
  }

  static create = (params: SVGEllipseParams): SVGEllipse => {
    return new SVGEllipse(params);
  };

  toSVGString = (): string => {
    return `M ${this.center.x} ${this.center.y} m -${this.radiusX}, 0 a ${
      this.radiusX
    },${this.radiusY} 0 1,0 ${this.radiusX * 2},0 a ${this.radiusX},${
      this.radiusY
    } 0 1,0 -${this.radiusX * 2},0`;
  };
  toString = (): string => {
    return `Ellipse at (${this.center.x}, ${this.center.y}) with radii ${this.radiusX} and ${this.radiusY}`;
  };
}
export default SVGEllipse;
