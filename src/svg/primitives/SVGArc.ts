import p5 from "p5";
import SVGArcParams from "./paramsdef/SVGArcParams.interface";
import Point from "./Point";
import SVGObject from "./SVGObject";
import SVGObjectType from "./SVGObjectTypes";

export class SVGArc extends SVGObject {
  public center: Point;
  public radiusX: number;
  public radiusY: number;
  public xAxisRotation: number;
  public endPosition: Point;
  // public center: Point;
  // public radius: number;
  // public startAngle: number;
  // public endAngle: number;

  constructor(params: SVGArcParams) {
    super(SVGObjectType.ARC, params.style);
    this.center = params.center;
    this.radiusX = params.rx;
    this.radiusY = params.ry;
    this.xAxisRotation = params.xAxisRotation;
    if (params.endPosition) {
      this.endPosition = new Point(params.x, params.y);
    }
    // this.center = params.center;
    // this.radius = params.radius;
    // this.startAngle = params.startAngle;
    // this.endAngle = params.endAngle;
  }

  static create = (params: SVGArcParams): SVGArc => {
    return new SVGArc(params);
  };

  toSVGString = (): string => {
    return `A ${this.radiusX} ${this.radiusY} ${this.xAxisRotation} 0 0 ${this.endPosition.x} ${this.endPosition.y}`;
    // return `M ${this.center.x} ${this.center.y} m -${this.radius}, 0 a ${
    //   this.radius
    // },${this.radius} 0 1,0 ${this.radius * 2},0 a ${this.radius},${
    //   this.radius
    // } 0 1,0 -${this.radius * 2},0`;
  };
  toString = (): string => {
    return `Arc from (${this.center.x}, ${this.center.y}) with radius ${this.radius}`;
  };

  static override processList = (doc: Document | null): SVGArc[] => {
    const arcs: SVGArc[] = [];
    if (doc) {
      const svgElementList = doc.querySelectorAll("path");
      for (const arcData of svgElementList) {
        const arc = SVGArc.process(arcData);
        if (arc) {
          // arcs.push(arc);
        }
      }
    }
    return arcs;
  };
  // A rx ry x-axis-rotation large-arc-flag sweep-flag x y
  // a rx ry x-axis-rotation large-arc-flag sweep-flag dx dy
  // TODO: Pass A|a string only, from path
  static processFromString = (str: string): SVGArc | null => {
    // const dString = element?.getAttribute("d");
    if (str) {
      const dArray = str.split(" ");
      if (dArray.length === 7) {
        const center = new Point(100, 100);
        const rx = parseFloat(dArray[1] as string);
        const ry = parseFloat(dArray[2] as string);
        const xAxisRotation = parseFloat(dArray[3] as string);
        // const largeArcFlag = 0; // parseFloat(dArray[4] as string);
        // const sweepFlag = 0; // parseFloat(dArray[5] as string);
        if (dArray[0] === "A") {
          // set end position
          const x = parseFloat(dArray[6] as string);
          const y = parseFloat(dArray[7] as string);
          const endPosition = new Point(x, y);
          return new SVGArc({
            center,
            rx,
            ry,
            xAxisRotation,
            endPosition,
          });
        }
        // else if (dArray[0] === "a") {
        //   const dx = parseFloat(dArray[6] as string);
        //   const dy = parseFloat(dArray[7] as string);
        // }
      }
    }
    return null;
  };

  // Find the Center:
  // The center isn’t directly given in SVG.
  // You’d need to use the SVG start point (x1, y1), SVG end point (x2, y2),
  // startPoint: { x: 10, y: 315 }
  // endPoint: { x: 162.55, y: 162.45 }

  // rx, ry: { 30, 50 }

  // x-axis-rotation,
  // (LATER: ) and flags
  // to compute it.
  //
  // This involves solving a system of equations
  // (beyond simple arithmetic,
  // often requiring trigonometry and matrix transformations).
  //
  // Libraries like svg-arc-to-center-param (in JavaScript)
  // can help, or you can approximate for simple cases.

  // Start and End Angles:
  // Once you have the center (cx, cy),
  // calculate the angle of the start point (x1, y1)
  // and end point (x2, y2) relative to the center using atan2(y - cy, x - cx).

  // Adjust for x-axis-rotation by rotating the angles if nonzero.
  // Sweep Direction:
  // SVG sweep-flag = 1 means clockwise; p5.js goes counterclockwise by default. If sweep-flag = 0, swap the start and stop angles to reverse direction.
  // Large Arc Flag:
  // In p5.js, the arc length is determined purely by start and stop. Use the large-arc-flag to decide if the angle difference should exceed 180 degrees.

  // h,k is center of ellipse
  // x_m is x-midpoint
  // y_m is y-midpoint

  static getMidpoint = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): {
    x_m: number;
    y_m: number;
  } => {
    const x_m = (x1 + x2) / 2;
    const y_m = (y1 + y2) / 2;
    return { x_m, y_m };
  };

  static getAdjustedCoordinates = (
    xRotTheta: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): {
    x1_prime: number;
    y1_prime: number;
  } => {
    const { x_m, y_m } = SVGArc.getMidpoint(x1, y1, x2, y2);
    const x1_prime =
      Math.cos(xRotTheta) * (x1 - x_m) - Math.sin(xRotTheta) * (y1 - y_m);
    const y1_prime =
      -Math.sin(xRotTheta) * (x1 - x_m) + Math.cos(xRotTheta) * (y1 - y_m);
    return { x1_prime, y1_prime };
  };

  static computeLambda = (
    xRotTheta: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    radiusX: number,
    radiusY: number
  ): number => {
    // a is semi-major axis / x-radius
    // b is semi-minor axis / y-radius
    const a = radiusX;
    const b = radiusY;
    const { x1_prime, y1_prime } = SVGArc.getAdjustedCoordinates(
      xRotTheta,
      x1,
      y1,
      x2,
      y2
    );
    const lhs = Math.pow(x1_prime, 2) / Math.pow(a, 2);
    const rhs = Math.pow(y1_prime, 2) / Math.pow(b, 2);
    const equationResult = lhs + rhs;
    const lambda = Math.sqrt(1 / equationResult);
    return lambda;
  };
  static computeCenterOffset = (
    xRotTheta: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    radiusX: number,
    radiusY: number
  ): {
    cx_prime: number;
    cy_prime: number;
  } => {
    const lambda = SVGArc.computeLambda(
      xRotTheta,
      x1,
      y1,
      x2,
      y2,
      radiusX,
      radiusY
    );
    const { x1_prime, y1_prime } = SVGArc.getAdjustedCoordinates(
      xRotTheta,
      x1,
      y1,
      x2,
      y2
    );

    const a = radiusX;
    const b = radiusY;
    // plus or minus, depending on the arc's direction
    const cx_prime = (lambda * (y1_prime * a)) / b;
    const cy_prime = (lambda * (x1_prime * b)) / a;
    return { cx_prime, cy_prime };
  };
  static transformBack = (
    xRotTheta: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    radiusX: number,
    radiusY: number
  ): {
    h: number;
    k: number;
  } => {
    const { x_m, y_m } = SVGArc.getMidpoint(x1, y1, x2, y2);
    const { cx_prime, cy_prime } = SVGArc.computeCenterOffset(
      xRotTheta,
      x1,
      y1,
      x2,
      y2,
      radiusX,
      radiusY
    );
    const h =
      x_m + (cx_prime * Math.cos(xRotTheta) - cy_prime * Math.sin(xRotTheta));
    const k =
      y_m + (cx_prime * Math.sin(xRotTheta) + cy_prime * Math.cos(xRotTheta));
    return { h, k };
  };
  static draw = (renderer: p5, element: SVGObject): void => {
    const arc = element as SVGArc;
    renderer.push();
    renderer.noFill();
    renderer.strokeWeight(arc.getStyle().strokeWeight || 1);
    renderer.stroke(arc.getStyle().strokeColor || "white");
    // renderer.beginShape();
    // renderer.vertex(arc.center.x, arc.center.y);
    // renderer.vertex(arc.center.x - arc.radius, arc.center.y);
    // renderer.arc(arc.center.x, arc.center.y);
    // .arc
    // arc.center.x,
    // arc.center.y,
    // arc.radius * 2,
    // arc.radius * 2,
    // arc.startAngle,
    // arc.endAngle
    // ();
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
