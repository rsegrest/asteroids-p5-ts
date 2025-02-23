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
}
export default SVGEllipse;
