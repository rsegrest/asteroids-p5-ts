import p5 from "p5";
import SVGPolygon from "./primitives/SVGPolygon";
import SVGStyle from "./primitives/SVGStyle";
import Point from "./primitives/Point";
import SVGCircle from "./primitives/SVGCircle";
import SVGEllipse from "./primitives/SVGEllipse";
import SVGLine from "./primitives/SVGLine";
import SVGArc from "./primitives/SVGArc";
import SVGFactory from "./SVGFactory";
import SVGBezierCurve from "./primitives/SVGBezierCurve";
import SVGPath from "./primitives/SVGPath";
import SVGText from "./primitives/SVGText";
import SVGImage from "./primitives/SVGImage";
import SVGRect from "./primitives/SVGRect";

// Root directory for loading files is dist/

// TODO: Process Circle
// TODO: Process Ellipse
// TODO: Process Line
// TODO: Process Arc
// TODO: Process Rect
// TODO: Process Bezier Curve

// : Generate Shape
// : Get Fill, Stroke, Stroke Weight
// : Generate Polygon on screen

// const svgDataString =
//   '<?xml version="1.0" encoding="utf-8"?>\
// <!-- Generator: Adobe Adobe Illustrator 24.2.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\
// <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="792px" height="612px" viewBox="0 0 792 612" style="enable-background:new 0 0 792 612;" xml:space="preserve">\
// <style type="text/css">\
// 	.st0{fill:#FFFFFF;stroke:#000000;stroke-miterlimit:10;}\
// </style>\
// <polygon class="st0" points="290.48,136.58 260.63,221.47 174.8,255.06 230.31,331.09 309.61,247.59 352.99,284.91 401.03,211.68 \
// 	360.92,142.64 "/>\
// </svg>';

export class SVGLoader {
  public static p: p5;

  private static styles: SVGStyle[] = [];
  private static polygons: SVGPolygon[] = [];
  private static lines: SVGLine[] = [];
  private static circles: SVGCircle[] = [];
  private static rects: SVGRect[] = [];
  private static ellipses: SVGEllipse[] = [];
  private static arcs: SVGArc[] = [];
  private static paths: SVGPath[] = [];
  private static images: SVGImage[] = [];
  private static bezierCurves: SVGBezierCurve[] = [];
  private static textObjects: SVGText[] = [];

  // move to functions? ref pulling class
  private static svgPolygonElementList: any | any[] = [];
  // private static svgLinesElementList: any | any[] = [];

  // private static fillColor = "pink";
  // private static strokeColor = "white";
  // private static strokeWeight = 1;

  constructor(p: p5) {
    SVGLoader.p = p;
  }

  static getStyleByName = (name: string): SVGStyle | null => {
    for (const style of this.styles) {
      if (style.name === name) {
        return style;
      }
    }
    return null;
  };

  // callback after loadStrings -- process all XML from SVG
  static handleSvgData = (data: string[]): void => {
    this.processSVG(data); // populates this.polygons (Raw SVG Elements)
  };

  // called from PRELOAD
  static loadSVG = (filename: string | null = null): void => {
    if (filename) {
      this.p.loadStrings(
        filename,
        (data: any) => this.handleSvgData(data) // callback
      );
    }
  };

  static processSVGStyle = (
    svgStyleData: any
    // svgStyleName: string,
    // svgStyleData: string
  ): SVGStyle => {
    const style: SVGStyle = {};
    if (svgStyleData.length > 0) {
      // TODO: match style name to polygon class
      let styleName = svgStyleData[0]?.innerHTML?.split("{")[0] || ""; // .st0
      styleName = styleName.replace(/[\t\n\r]/gm, "");
      const styleAttributesString =
        svgStyleData[0]?.innerHTML?.split("{")[1] || ""; // fill: #FFFFFF; stroke: #000000; stroke-miterlimit: 10;

      style.name = styleName;
      const styleAttributes = styleAttributesString.split(";");
      if (styleAttributes && styleAttributes.length > 0) {
        for (const attr of styleAttributes) {
          const [key, value] = attr.split(":");
          if (key === "fill") {
            if (value) {
              style.fillColor = value;
            }
          } else if (key === "stroke") {
            if (value) {
              style.strokeColor = value;
            }
          } else if (key === "stroke-width") {
            if (value) {
              style.strokeWeight = parseFloat(value);
            }
          }
        }
      }
    }
    return style;
  };

  // Pulls Polygon XML data from SVG
  static processSVG(data: string[]): any {
    // console.log("processSVG");
    const svgString = data?.join("\n");
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, "image/svg+xml");

    // Get class from polygon, lines, circles
    // const svgElementClass =
    this.svgPolygonElementList[0]?.getAttribute("class");

    // for polygon
    // if:

    // const svgBezierCurveElementList = doc.querySelectorAll("bezierCurve");

    const svgStyleData: any = doc.querySelectorAll("style");
    // TODO: Save in style list with class name

    // const svgClassData = poly.getAttribute("class");
    // const svgStyle = this.proscessSVGStyle(svgStyleData);

    this.polygons.push(...SVGPolygon.processList(doc));
    this.lines.push(...SVGLine.processList(doc));
    this.circles.push(...SVGCircle.processList(doc));
    this.rects.push(...SVGRect.processList(doc));
    this.paths.push(...SVGPath.processList(doc));
    this.ellipses.push(...SVGEllipse.processList(doc));
    this.images.push(...SVGImage.processList(doc, this.p));

    // for (const poly of svgPolygonElementList) {
    // const svgStyleData = poly.getAttribute("class");
    // console.log("svgClassData");
    // console.log(svgClassData);
    // console.log("svgStyleData");
    // console.log(svgStyleData);
    // console.log("svgStyle");
    // console.log(svgStyle);
    // const polyObj = SVGPolygon.process(poly); // calls points to 2D array
    // this.ptArray now available
    // if (polyObj) {
    // polyObj.setStyle(svgStyle);
    // this.polygons.push(polyObj);
    // }
    // }

    // ellipse
  }

  static drawArcs = (): void => {
    this.p.push();
    this.p.fill("yellow");
    this.p.stroke("white");
    this.p.strokeWeight(1);
    if (this.arcs.length > 0) {
      for (const arc of this.arcs) {
        this.p.arc(
          arc.center.x as number,
          arc.center.y as number,
          arc.radius * 2,
          arc.radius * 2,
          arc.startAngle,
          arc.endAngle
        );
      }
    }
    this.p.pop();
  };

  static drawAll = (): void => {
    SVGPolygon.drawList(SVGLoader.p, SVGLoader.polygons);
    SVGLine.drawList(SVGLoader.p, SVGLoader.lines);
    SVGCircle.drawList(SVGLoader.p, SVGLoader.circles);
    SVGRect.drawList(SVGLoader.p, SVGLoader.rects);
    SVGPath.drawList(SVGLoader.p, SVGLoader.paths);
    SVGEllipse.drawList(SVGLoader.p, SVGLoader.ellipses);
    SVGImage.drawList(SVGLoader.p, SVGLoader.images);
    // SVGLoader.drawEllipses();
    // SVGLoader.drawArcs();
    // SVGLoader.drawTextObjects();
    // SVGLoader.drawImages();
  };

  static registerRenderer = (p: p5): void => {
    this.p = p;
  };
}

export default SVGLoader;
