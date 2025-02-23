import p5 from "p5";
import SVGFactory from "../SVGFactory";
import SVGPathParams from "./paramsdef/SVGPathParams.interface";
import SVGObject from "./SVGObject";
import SVGObjectType from "./SVGObjectTypes";
import Point from "./Point";
// import SVGLine from "./SVGLine";

export class SVGPath extends SVGObject {
  // public lines: SVGLine[] = [];
  public points: Point[] = [];

  constructor(params: SVGPathParams) {
    super(SVGObjectType.PATH, params.style);
    this.points = params.points;
  }

  static create = (params: SVGPathParams): SVGPath => {
    return new SVGPath(params);
  };

  toSVGString = (): string => {
    return `<path d="${this.points
      .map((point) => `${point.x},${point.y}`)
      .join(" ")}" />`;
  };
  toString = (): string => {
    return `Path with ${this.points.length} lines:\n\t${this.points}`;
  };
  static override process = (element: Element): SVGPath | null => {
    const instructionsAsStringList =
      element?.getAttribute("d")?.split(" ") || null;
    const pointsAsStringList: string[] = [];
    const points: Point[] = [];
    let closeFlag = false;
    if (instructionsAsStringList) {
      for (let point of instructionsAsStringList) {
        point = point.replace("M", "");
        point = point.replace("L", "");
        if (point.includes("Z")) {
          closeFlag = true;
        }
        point = point.replace("Z", "");
        // TODO: move to flag?
        // TODO: lines?
        if (point !== "") {
          pointsAsStringList.push(point);
        }
      }
      for (let i = 0; i < pointsAsStringList.length; i += 2) {
        const xStr = pointsAsStringList[i];
        const yStr = pointsAsStringList[i + 1];
        if (typeof xStr === "string" && typeof yStr === "string") {
          const x = parseFloat(xStr);
          const y = parseFloat(yStr);
          if (typeof x === "number" && typeof y === "number") {
            points.push(new Point(x, y));
          }
        }
      }
      if (closeFlag) {
        if (points[0]) {
          points.push(points[0]);
        }
      }
      if (points) {
        const params: SVGPathParams = {
          style: {},
          points,
        };
        const path = SVGFactory.createPath(params) as SVGPath;
        return path;
      }
    }
    return null;
  };
  static override processList = (doc: Document | null): SVGPath[] => {
    const pathList: SVGPath[] = [];
    if (doc) {
      const svgElementList = doc.querySelectorAll("path");
      console.log("processList for paths");
      console.log(JSON.stringify(svgElementList));
      for (const pathData of svgElementList) {
        console.log("inside for loop");
        console.log(pathData);
        const path = SVGPath.process(pathData);
        console.log("the path:");
        console.log(path);
        if (path) {
          pathList.push(path);
        }
      }
    }
    return pathList;
  };
  static override drawList = (renderer: p5, elements: SVGObject[]): void => {
    if (elements.length > 0) {
      for (const path of elements) {
        this.draw(renderer, path);
      }
    }
  };
  static override draw = (renderer: p5, element: SVGObject): void => {
    renderer.push();
    renderer.fill("purple");
    renderer.stroke("white");
    renderer.strokeWeight(1);
    const path = element as SVGPath;
    if (path.points.length > 0) {
      for (let i = 0; i < path.points.length - 1; i += 1) {
        const p1 = path.points[i];
        const p2 = path.points[i + 1];
        if (p1 && p2) {
          renderer.line(
            p1.x as number,
            p1.y as number,
            p2.x as number,
            p2.y as number
          );
        }
      }
    }
    renderer.pop();
  };
}
export default SVGPath;
