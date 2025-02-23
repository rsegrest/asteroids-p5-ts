import SVGArcParams from "./paramsdef/SVGArcParams.interface";
import Point from "./Point";
import SVGObject from "./SVGObject";
import SVGObjectType from "./SVGObjectTypes";

export class SVGArc extends SVGObject {
  public center: Point;
  public radius: number;
  public startAngle: number;
  public endAngle: number;

  constructor(params: SVGArcParams) {
    super(SVGObjectType.ARC, params.style);
    this.center = params.center;
    this.radius = params.radius;
    this.startAngle = params.startAngle;
    this.endAngle = params.endAngle;
  }

  static create = (params: SVGArcParams): SVGArc => {
    return new SVGArc(params);
  };
}
export default SVGArc;
