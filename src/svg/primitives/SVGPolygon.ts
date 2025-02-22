import { Point } from "./Point";
import SVGObject from "./SVGObject";
import SVGObjectType from "./SVGObjectTypes";
import SVGStyle from "./SVGStyle";

export class SVGPolygon extends SVGObject {
  constructor(
    // public readonly type: SVGObjectType,
    // TODO: Create an abstract class for points
    public readonly points: Point[],
    style: SVGStyle
  ) {
    super(SVGObjectType.POLYGON, style);
    this.points = points;
  }

  static create = (points: Point[]): SVGObject => {
    return SVGObject.createPolygon({ points });
  };
}
export default SVGPolygon;
