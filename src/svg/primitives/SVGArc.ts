import p5 from "p5";
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

  static override processList = (doc: Document | null): SVGArc[] => {
    const arcs: SVGArc[] = [];
    if (doc) {
      const svgElementList = doc.querySelectorAll("path");
      for (const arcData of svgElementList) {
        const arc = SVGArc.process(arcData);
        if (arc) {
          arcs.push(arc);
        }
      }
    }
    return arcs;
  };
  // A rx ry x-axis-rotation large-arc-flag sweep-flag x y
  // a rx ry x-axis-rotation large-arc-flag sweep-flag dx dy
  // TODO: Pass A|a string only, from path
  static process = (element: Element): SVGArc | null => {
    const dString = element?.getAttribute("d");
    if (dString) {
      const dArray = dString.split(" ");
      if (dArray.length === 7) {
        const center = new Point(0, 0);
        const radius = parseFloat(dArray[2] as string);
        const startAngle = parseFloat(dArray[4] as string);
        const endAngle = parseFloat(dArray[5] as string);
        return new SVGArc({ center, radius, startAngle, endAngle });
      }
    }
    return null;
  };

  static draw = (renderer: p5, element: SVGObject): void => {
    const arc = element as SVGArc;
    renderer.push();
    renderer.noFill();
    renderer.strokeWeight(arc.getStyle().strokeWeight || 1);
    renderer.stroke(arc.getStyle().strokeColor || "white");
    renderer.beginShape();
    renderer.vertex(arc.center.x, arc.center.y);
    renderer.vertex(arc.center.x - arc.radius, arc.center.y);
    renderer.arc(
      arc.center.x,
      arc.center.y,
      arc.radius * 2,
      arc.radius * 2,
      arc.startAngle,
      arc.endAngle
    );
    renderer.endShape();
    renderer.pop();
  };
  static drawList = (renderer: p5, elements: SVGObject[]): void => {
    for (const arc of elements) {
      SVGArc.draw(renderer, arc);
    }
  };
}
export default SVGArc;
