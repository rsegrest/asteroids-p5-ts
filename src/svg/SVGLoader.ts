import p5 from "p5";
import SVGPolygon from "./primitives/SVGPolygon";
import SVGStyle from "./primitives/SVGStyle";
import Point from "./primitives/Point";
import SVGObject from "./primitives/SVGObject";
import SVGCircle from "./primitives/SVGCircle";
import SVGEllipse from "./primitives/SVGEllipse";
import SVGLine from "./primitives/SVGLine";
import SVGArc from "./primitives/SVGArc";

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
  private static circles: SVGCircle[] = [];
  private static rects: SVGRect[] = [];
  private static ellipses: SVGEllipse[] = [];
  private static lines: SVGLine[] = [];
  private static arcs: SVGArc[] = [];
  // private static bezierCurves: SVGBezierCurve[] = [];

  private static svgPolygonElementList: any | any[] = [];

  private static fillColor = "pink";
  private static strokeColor = "white";
  private static strokeWeight = 1;

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
    console.log("loadSVG");
    console.log(this.p);
    if (filename) {
      this.p.loadStrings(
        filename,
        (data: any) => this.handleSvgData(data) // callback
      );
    }
  };

  // <svg>
  // id="Layer_1"
  // x="0px"
  // y="0px"
  // width="792px"
  // height="612px"
  // viewBox="0 0 792 612"
  // style="enable-background:new 0 0 792 612;"
  // xml:space="preserve"
  // </svg>

  // <?xml version="1.0" encoding="utf-8"?>
  // <!-- Generator: Adobe Adobe Illustrator 24.2.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
  // <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  // 	 width="792px" height="612px" viewBox="0 0 792 612" style="enable-background:new 0 0 792 612;" xml:space="preserve">
  // <style type="text/css">
  // 	.st0{fill:#FFFFFF;stroke:#000000;stroke-miterlimit:10;}
  // </style>
  // <polygon class="st0" points="290.48,136.58 260.63,221.47 174.8,255.06 230.31,331.09 309.61,247.59 352.99,284.91 401.03,211.68
  // 	360.92,142.64 "/>
  // </svg>

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
    const svgString = data?.join("\n");
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, "image/svg+xml");
    const svgElementClass =
      this.svgPolygonElementList[0]?.getAttribute("class");

    // for polygon
    // if:
    this.svgPolygonElementList = doc.querySelectorAll("polygon");
    // then type = polygon, process polygon

    const svgStyleData: any = doc.querySelectorAll("style");

    const svgStyle = this.processSVGStyle(svgStyleData);

    for (const poly of this.svgPolygonElementList) {
      const polyObj = this.processPolygon(poly); // calls points to 2D array
      // this.ptArray now available
      if (polyObj) {
        polyObj.setStyle(svgStyle);
        this.polygons.push(polyObj);
      }
    }
  }

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

  // gets points string data from polygon SVG element
  // calls pointsTo2DArray and assigns to this.ptArray (numbers)
  static processPolygon = (poly: Element): SVGPolygon | null => {
    const pointsAsStringList = poly?.getAttribute("points")?.split(" ") || null;
    let ptArray;
    if (pointsAsStringList) {
      ptArray = this.pointStringListToPointObjArray(pointsAsStringList);
      if (ptArray) {
        const polygon = SVGObject.createPolygon({
          points: ptArray,
        }) as SVGPolygon;
        return polygon;
      }
    }
    return null;
  };

  static processCircle = (circle: Element): SVGObject | null => {
    const rString = circle?.getAttribute("r");
    const cxString = circle?.getAttribute("cx");
    const cyString = circle?.getAttribute("cy");
    let radius;
    let cx;
    let cy;
    if (rString && cxString && cyString) {
      radius = parseFloat(rString);
      cx = parseFloat(cxString);
      cy = parseFloat(cyString);
      if (radius && cx && cy) {
        const circle = SVGObject.createCircle({
          center: new Point(cx, cy),
          radius,
        });
        return circle;
      }
    }
    return null;
  };

  static drawPolygon = (): void => {
    this.p.push();
    if (this.fillColor) {
      this.p.fill(this.fillColor);
    }
    this.p.stroke(this.strokeColor);
    this.p.strokeWeight(this.strokeWeight);
    this.p.beginShape();
    if (this.polygons.length > 0) {
      for (const pg of this.polygons) {
        const ptArray = pg.points;
        for (const pt of ptArray) {
          this.p.vertex(pt.x as number, pt.y as number);
        }
      }
    }
    this.p.endShape(this.p.CLOSE);
    this.p.pop();
  };

  static registerRenderer = (p: p5): void => {
    this.p = p;
  };
}

export default SVGLoader;
