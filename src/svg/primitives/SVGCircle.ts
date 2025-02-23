import p5 from "p5";
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

  static override processList = (doc: Document | null): SVGCircle[] => {
    const circles: SVGCircle[] = [];
    if (doc) {
      const svgElementList = doc.querySelectorAll("circle");
      for (const lineData of svgElementList) {
        const circle = SVGCircle.process(lineData);
        if (circle) {
          circles.push(circle);
        }
      }
    }
    return circles;
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
      if (
        typeof radius === "number" &&
        typeof cx === "number" &&
        typeof cy === "number"
      ) {
        const circle = SVGFactory.createCircle({
          center: new Point(cx, cy),
          radius,
        });
        return circle;
      }
    }
    return null;
  };

  static drawList = (renderer: p5, elements: SVGObject[]): void => {
    for (const element of elements) {
      SVGObject.setStyle(renderer, element.getStyle());
      if (elements.length > 0) {
        for (const c of elements) {
          const circle = c as SVGCircle;
          this.draw(renderer, circle);
        }
      }
    }
  };

  static draw = (renderer: p5, element: SVGObject): void => {
    renderer.push();
    renderer.fill("green");
    renderer.stroke("white");
    renderer.strokeWeight(1);
    const circleObj = element as SVGCircle;
    renderer.circle(
      circleObj.center.x as number,
      circleObj.center.y as number,
      circleObj.radius
    );
    renderer.pop();
  };
}
export default SVGCircle;
