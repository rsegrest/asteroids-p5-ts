import SVGCircleParams from "./paramsdef/SVGCircleParams.interface";
import Point from "./Point";
import SVGObject from "./SVGObject";
import SVGObjectType from "./SVGObjectTypes";

export class SVGCircle extends SVGObject {
  public center: Point;
  public radius: number;

  constructor(params: SVGCircleParams) {
    super(SVGObjectType.CIRCLE, params.style);
    this.center = params.center;
    this.radius = params.radius;
  }

  static create = (params: SVGCircleParams): SVGCircle => {
    return new SVGCircle(params);
  };
}
export default SVGCircle;
