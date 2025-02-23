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

  // static override processList = (doc: Document | null): SVGPolygon[] => {
  //   const polygons: SVGPolygon[] = [];
  //   if (doc) {
  //     console.log("found doc");
  //     const svgElementList = doc.querySelectorAll("polygon");
  //     for (const poly of svgElementList) {
  //       const polygon = SVGPolygon.process(poly);
  //       if (polygon) {
  //         polygons.push(polygon);
  //       }
  //     }
  //   }
  //   return polygons;
  // };

  // static override process = (element: Element): SVGLine | null => {
  //   const pointsAsStringList =
  //     element?.getAttribute("points")?.split(" ") || null;
  //   let ptArray;
  //   if (pointsAsStringList) {
  //     ptArray = SVGFactory.pointStringListToPointObjArray(pointsAsStringList);
  //     if (ptArray) {
  //       const line = SVGFactory.createLine({
  //         points: ptArray,
  //       }) as SVGLine;
  //       return line;
  //     }
  //   }
  //   return null;
  // };

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
    console.log("process line:");
    const x1String = element?.getAttribute("x1");
    const y1String = element?.getAttribute("y1");
    const x2String = element?.getAttribute("x2");
    const y2String = element?.getAttribute("y2");
    // console.log("x1,y1,x2,y2string:");
    // console.log(x1String);
    // console.log(y1String);
    // console.log(x2String);
    // console.log(y2String);
    let x1;
    let y1;
    let x2;
    let y2;
    if (x1String && y1String && x2String && y2String) {
      x1 = parseFloat(x1String);
      y1 = parseFloat(y1String);
      x2 = parseFloat(x2String);
      y2 = parseFloat(y2String);

      // console.log("x1,y1,x2,y2:");
      // console.log(x1);
      // console.log(y1);
      // console.log(x2);
      // console.log(y2);
      if (
        typeof x1 === "number" &&
        typeof y1 === "number" &&
        typeof x2 === "number" &&
        typeof y2 === "number"
      ) {
        // console.log("points are valid numbers");
        const line = SVGFactory.createLine({
          p1: new Point(x1, y1),
          p2: new Point(x2, y2),
        });
        // console.log("line:");
        // console.log(JSON.stringify(line));
        return line;
      }
    }
    return null;
    // };
  };
}
export default SVGLine;
