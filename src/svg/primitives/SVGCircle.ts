import SVGFactory from "../SVGFactory";
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
  toSVGString = (): string => {
    return `M ${this.center.x} ${this.center.y} m -${this.radius}, 0 a ${
      this.radius
    },${this.radius} 0 1,0 ${this.radius * 2},0 a ${this.radius},${
      this.radius
    } 0 1,0 -${this.radius * 2},0`;
  };
  toString = (): string => {
    return `Circle at (${this.center.x}, ${this.center.y}) with radius ${this.radius}`;
  };

  static process = (element: Element): SVGCircle | null => {
    const rString = element?.getAttribute("r");
    const cxString = element?.getAttribute("cx");
    const cyString = element?.getAttribute("cy");
    let radius;
    let cx;
    let cy;
    if (rString && cxString && cyString) {
      radius = parseFloat(rString);
      cx = parseFloat(cxString);
      cy = parseFloat(cyString);
      if (radius && cx && cy) {
        const circle = SVGFactory.createCircle({
          center: new Point(cx, cy),
          radius,
        });
        return circle;
      }
    }
    return null;
  };

  // static draw = (element: SVGCircle): SVGCircle => {
  //   return element;
  // }
}
export default SVGCircle;
