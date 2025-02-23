import p5 from "p5";
import SVGFactory from "../SVGFactory";
import SVGPathParams from "./paramsdef/SVGPathParams.interface";
import SVGObject from "./SVGObject";
import SVGObjectType from "./SVGObjectTypes";
import Point from "./Point";
import SVGLine from "./SVGLine";
// import SVGLine from "./SVGLine";

export class SVGPath extends SVGObject {
  public lines: SVGLine[] = [];
  public arcs: any[] = [];

  // MOVE TO FUNCTION?
  private startPoint: Point | null = null;

  public points: Point[] = [];

  constructor(params: SVGPathParams) {
    super(SVGObjectType.PATH, params.style);
    if (params.lines) {
      this.lines = params.lines;
    }
    if (params.points) {
      this.points = params.points;
    }
    if (params.arcs) {
      this.arcs = params.arcs;
    }
    // this.lines = params.lines;
    // this.startPoint = params.startPoint;
    // this.endPoint = params.endPoint;
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
    const points: Point[] = []; // don't use
    const lines: SVGLine[] = [];
    let closeFlag = false;
    if (instructionsAsStringList) {
      let currentPenPoint: Point | null = null;
      for (let p = 0; p < instructionsAsStringList.length; p += 1) {
        let param = instructionsAsStringList[p] as string;
        if (param && param !== "") {
          if (param.includes("Z")) {
            closeFlag = true;
          } else if (param.includes("M")) {
            param = param.replace("M", "");
            const nextParamStr = instructionsAsStringList[p + 1];
            if (nextParamStr && typeof nextParamStr === "string") {
              const x = parseFloat(param);
              const y = parseFloat(nextParamStr);
              // this.startPoint = new Point(x, y);
              if (typeof x === "number" && typeof y === "number") {
                currentPenPoint = new Point(x, y);
                // console.log("moveToPoint:");
                // console.log(currentPenPoint);
              }
            }
          } else if (param.includes("L")) {
            // CREATE LINE
            const lineStart = currentPenPoint;
            const lineEndXStr = param.replace("L", "");
            const lineEndYStr = instructionsAsStringList[p + 1];
            if (
              lineStart &&
              lineEndXStr &&
              lineEndYStr &&
              typeof lineEndXStr === "string" &&
              typeof lineEndYStr === "string"
            ) {
              const p2x = parseFloat(lineEndXStr);
              const p2y = parseFloat(lineEndYStr);
              if (typeof p2x === "number" && typeof p2y === "number") {
                // points.push(moveToPoint);
                // points.push(new Point(nextPointX, nextPointY));
                const lineParams = {
                  style: {},
                  p1: lineStart,
                  p2: new Point(p2x, p2y),
                };
                currentPenPoint = new Point(p2x, p2y);
                console.log("creating a line:");
                console.log(lineParams);
                lines.push(SVGLine.create(lineParams));
                p += 1;
              }
            }
          }
          // if (param.includes("L")) {
          //   param = param.replace("L", "");
          //   // CREATE LINE
          //   console.log();
          // }
          if (param.includes("A")) {
            // create an arc with next 7 numbers
            // const arc = instructionsAsStringList.slice(p, p + 7).join(" ");
            // TODO: process arc
            // p += 6;
          }
          if (param === "Z") {
            closeFlag = true;
            const lastPt = lines[lines.length - 1]?.p2;
            const firstPt = lines[0]?.p1;
            if (lastPt && firstPt) {
              const lineParams = {
                style: {},
                p1: lastPt,
                p2: firstPt,
              };
              lines.push(SVGLine.create(lineParams));
            }
            // const lineParams = {
            // style: {},
            // p1: moveToPoint,
            // p2: lines.?[0].p1
            // };
            lines.push();
          }
          // param = param.replace("Z", "");
          // // TODO: move to flag?
          // // TODO: lines?
          // if (param !== "") {
          //   pointsAsStringList.push(param);
          // }
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
      return SVGPath.create({ style: {}, points, lines });
      // return { lines, points }
      // if (closeFlag) {
      //   if (points[0]) {
      //     points.push(points[0]);
      //   }
      // }
      // if (points) {
      //   const params: SVGPathParams = {
      //     style: {},
      //     points,
      //   };
      //   const path = SVGFactory.createPath(params) as SVGPath;
      //   return path;
      // }
    }
    return null;
  };
  static override processList = (doc: Document | null): SVGPath[] => {
    const pathList: SVGPath[] = [];
    if (doc) {
      const svgElementList = doc.querySelectorAll("path");
      for (const pathData of svgElementList) {
        const path = SVGPath.process(pathData);
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
    console.log("in draw, path.lines.length = ");
    console.log(path.lines.length);
    if (path.lines.length > 0) {
      for (let i = 0; i < path.lines.length; i += 1) {
        const line = path.lines[i];
        if (line) {
          console.log("drawing line:");
          console.log(line);
          SVGLine.draw(renderer, line);
        }
        // const p2 = path.points[i + 1];
        // if (p1 && p2) {
        // renderer.line(
        // p1.x as number,
        // p1.y as number,
        // p2.x as number,
        // p2.y as number
        // );
        // }
      }
    }
    renderer.pop();
  };
}
export default SVGPath;
