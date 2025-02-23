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

  toSVGString = (): string => {
    return `M ${this.center.x} ${this.center.y} m -${this.radius}, 0 a ${
      this.radius
    },${this.radius} 0 1,0 ${this.radius * 2},0 a ${this.radius},${
      this.radius
    } 0 1,0 -${this.radius * 2},0`;
  };
  toString = (): string => {
    return `Arc at (${this.center.x}, ${this.center.y}) with radius ${this.radius} from ${this.startAngle} to ${this.endAngle}`;
  };
}
export default SVGArc;
