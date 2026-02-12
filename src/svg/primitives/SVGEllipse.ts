import p5 from "p5";
import SVGEllipseParams from "./paramsdef/SVGEllipseParams.interface";
import Point from "./Point";
import SVGObject from "./SVGObject";
import SVGObjectType from "./SVGObjectTypes";
import SVGFactory from "../SVGFactory";

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

  static override processList = (doc: Document | null): SVGEllipse[] => {
    const ellipses: SVGEllipse[] = [];
    if (doc) {
      const svgElementList = doc.querySelectorAll("ellipse");
      for (const ellipseData of svgElementList) {
        const ellipse = SVGEllipse.process(ellipseData);
        if (ellipse) {
          ellipses.push(ellipse);
        }
      }
    }
    return ellipses;
  };
  static process = (element: Element): SVGEllipse | null => {
    // static processLine = (line: Element): SVGLine | null => {
    const cx = element?.getAttribute("cx");
    const cy = element?.getAttribute("cy");
    const rx = element?.getAttribute("rx");
    const ry = element?.getAttribute("ry");
    let centerPt;
    let radiusX;
    let radiusY;
    if (
      typeof cx === "string" &&
      typeof cy === "string" &&
      typeof rx === "string" &&
      typeof ry === "string"
    ) {
      centerPt = new Point(parseFloat(cx), parseFloat(cy));
      radiusX = parseFloat(rx);
      radiusY = parseFloat(ry);
      if (
        centerPt &&
        typeof radiusX === "number" &&
        typeof radiusY === "number"
      ) {
        const params: SVGEllipseParams = {
          center: centerPt,
          radiusX,
          radiusY,
        };
        const ellipse = SVGFactory.createEllipse(params);
        return ellipse;
      }
    }
    return null;
    // };
  };
  static override draw = (renderer: p5, element: SVGObject): void => {
    renderer.push();
    const ellipse = element as SVGEllipse;

    renderer.stroke("white");
    renderer.strokeWeight(3);
    renderer.ellipse(
      ellipse.center.x,
      ellipse.center.y,
      ellipse.radiusX,
      ellipse.radiusY
    );
    renderer.pop();
  };
  static override drawList = (renderer: p5, elements: SVGObject[]): void => {
    for (const element of elements) {
      SVGObject.setStyle(renderer, element.getStyle());
      if (elements.length > 0) {
        for (const el of elements) {
          const ellipse = el as SVGEllipse;
          this.draw(renderer, ellipse);
        }
      }
    }
  };
}
export default SVGEllipse;
