import { SVGFactory } from "../SVGFactory";
import SVGPolygonParams from "./paramsdef/SVGPolygonParams.interface";
import { Point } from "./Point";
import SVGObject from "./SVGObject";
import SVGObjectType from "./SVGObjectTypes";

export class SVGPolygon extends SVGObject {
  public points: Point[];
  constructor(params: SVGPolygonParams) {
    super(SVGObjectType.POLYGON, params.style);
    this.points = params.points;
  }

  static create = (points: Point[]): SVGPolygon => {
    return SVGFactory.createPolygon({ points });
  };
}
export default SVGPolygon;
