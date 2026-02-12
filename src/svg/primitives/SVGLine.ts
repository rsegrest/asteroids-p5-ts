import p5 from "p5";
import SVGFactory from "../SVGFactory";
import SVGLineParams from "./paramsdef/SVGLineParams.interface";
import Point from "./Point";
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
  toSVGString = (): string => {
    return `M ${this.p1.x} ${this.p1.y} L ${this.p2.x} ${this.p2.y}`;
  };
  toString = (): string => {
    return `Line from (${this.p1.x}, ${this.p1.y}) to (${this.p2.x}, ${this.p2.y})`;
  };

  static override processList = (doc: Document | null): SVGLine[] => {
    const lines: SVGLine[] = [];
    if (doc) {
      const svgElementList = doc.querySelectorAll("line");
      for (const lineData of svgElementList) {
        const line = SVGLine.process(lineData);
        if (line) {
          lines.push(line);
        }
      }
    }
    return lines;
  };
  static process = (element: Element): SVGLine | null => {
    // static processLine = (line: Element): SVGLine | null => {
    const x1String = element?.getAttribute("x1");
    const y1String = element?.getAttribute("y1");
    const x2String = element?.getAttribute("x2");
    const y2String = element?.getAttribute("y2");
    let x1;
    let y1;
    let x2;
    let y2;
    if (x1String && y1String && x2String && y2String) {
      x1 = parseFloat(x1String);
      y1 = parseFloat(y1String);
      x2 = parseFloat(x2String);
      y2 = parseFloat(y2String);
      if (
        typeof x1 === "number" &&
        typeof y1 === "number" &&
        typeof x2 === "number" &&
        typeof y2 === "number"
      ) {
        const line = SVGFactory.createLine({
          p1: new Point(x1, y1),
          p2: new Point(x2, y2),
        });
        return line;
      }
    }
    return null;
  };
  static override draw = (renderer: p5, element: SVGObject): void => {
    renderer.push();
    const line = element as SVGLine;

    renderer.stroke("white");
    renderer.strokeWeight(3);
    renderer.line(
      line.p1.x as number,
      line.p1.y as number,
      line.p2.x as number,
      line.p2.y as number
    );
    renderer.pop();
  };
  static override drawList = (renderer: p5, elements: SVGObject[]): void => {
    for (const element of elements) {
      SVGObject.setStyle(renderer, element.getStyle());
      if (elements.length > 0) {
        for (const ln of elements) {
          const line = ln as SVGLine;
          this.draw(renderer, line);
        }
      }
    }
  };
}
export default SVGLine;
