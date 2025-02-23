import SVGLineParams from "./paramsdef/SVGLineParams.interface";
import { Point } from "./Point";
import SVGObject from "./SVGObject";
import SVGObjectType from "./SVGObjectTypes";

export class SVGLine extends SVGObject {
  public p1: Point;
  public p2: Point;

  constructor(params: SVGLineParams) {
    super(SVGObjectType.LINE, params.style);
    this.p1 = params.p1;
    this.p2 = params.p2;
  }

  static create = (params: SVGLineParams): SVGLine => {
    return new SVGLine(params);
  };
}
export default SVGLine;
