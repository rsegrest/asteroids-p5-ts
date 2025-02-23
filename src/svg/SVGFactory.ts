import SVGArcParams from "./primitives/paramsdef/SVGArcParams.interface";
import SVGBezierCurveParams from "./primitives/paramsdef/SVGBezierCurveParams.interface";
import SVGCircleParams from "./primitives/paramsdef/SVGCircleParams.interface";
import SVGEllipseParams from "./primitives/paramsdef/SVGEllipseParams.interface";
import SVGImageParams from "./primitives/paramsdef/SVGImageParams.interface";
import SVGLineParams from "./primitives/paramsdef/SVGLineParams.interface";
import SVGPathParams from "./primitives/paramsdef/SVGPathParams.interface";
import SVGPolygonParams from "./primitives/paramsdef/SVGPolygonParams.interface";
import SVGRectParams from "./primitives/paramsdef/SVGRectParams.interface";
import SVGTextParams from "./primitives/paramsdef/SVGTextParams.interface";
import Point from "./primitives/Point";
import SVGArc from "./primitives/SVGArc";
import SVGBezierCurve from "./primitives/SVGBezierCurve";
import SVGCircle from "./primitives/SVGCircle";
import SVGEllipse from "./primitives/SVGEllipse";
import SVGImage from "./primitives/SVGImage";
import SVGLine from "./primitives/SVGLine";
import SVGPath from "./primitives/SVGPath";
import SVGPolygon from "./primitives/SVGPolygon";
import SVGRect from "./primitives/SVGRect";
import SVGText from "./primitives/SVGText";

export class SVGFactory {
  static createPolygon = (params: SVGPolygonParams): SVGPolygon => {
    return new SVGPolygon(params);
  };
  static createCircle = (params: SVGCircleParams): SVGCircle => {
    return new SVGCircle(params);
  };
  static createLine = (params: SVGLineParams): SVGLine => {
    const newLine = new SVGLine(params);
    return newLine;
  };
  static createPath = (params: SVGPathParams): SVGPath => {
    const newPath = new SVGPath(params);
    return newPath;
  };
  static createEllipse = (params: SVGEllipseParams): SVGEllipse => {
    return new SVGEllipse(params);
  };
  static createArc = (params: SVGArcParams): SVGArc => {
    return new SVGArc(params);
  };
  static createRect = (params: SVGRectParams): SVGRect => {
    return new SVGRect(params);
  };
  static createBezierCurve = (params: SVGBezierCurveParams): SVGBezierCurve => {
    return new SVGBezierCurve(params);
  };
  static createText = (params: SVGTextParams): SVGText => {
    return new SVGText(params);
  };
  static createImage = (params: SVGImageParams): SVGImage => {
    return new SVGImage(params);
  };
  // converts this.points string to 2D this.ptArray of numbers
  // example input: [ "290.48,136.58", "260.63,221.47", "174.8,255.06", "230.31,331.09", "309.61,247.59", "352.99,284.91", "401.03,211.68", "", "", "360.92,142.64", ""]
  static pointStringListToPointObjArray = (
    pointsAsStringList: string[]
  ): // points: string[]
  Point[] => {
    const ptArray: Point[] = [];
    if (pointsAsStringList) {
      for (const pt of pointsAsStringList) {
        const xyArray = pt.split(",");
        if (xyArray.length > 1) {
          const [x, y] = pt.split(",");
          if (x && y) {
            if (typeof x === "string" && typeof y === "string") {
              const xNum = parseFloat(x);
              const yNum = parseFloat(y);
              if (isNaN(xNum) || isNaN(yNum)) {
                console.warn("Error: x or y is not a number");
                return [];
              }
              const ptObj = Point.from2DArray([xNum, yNum]);
              if (ptObj) ptArray.push(ptObj);
            }
          }
        }
      }
    }
    return ptArray;
  };
}
export default SVGFactory;
