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
  private static bezierCurves: SVGBezierCurve[] = [];
  private static textObjects: SVGText[] = [];
  private static paths: SVGPath[] = [];
  private static images: SVGImage[] = [];

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
    // console.log("handleSvgData");
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

    this.polygons.push(...SVGPolygon.processList(doc));
    this.lines.push(...SVGLine.processList(doc));
    this.circles.push(...SVGCircle.processList(doc));
    this.rects.push(...SVGRect.processList(doc));
    this.paths.push(...SVGPath.processList(doc));
    // const svgPolygonElementList = doc.querySelectorAll("polygon");
    // const svgClassData = poly.getAttribute("class");
    // const svgStyle = this.proscessSVGStyle(svgStyleData);

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

    // for (const line of svgLinesElementList) {
    //   const lineObj = this.processLine(line);
    //   if (lineObj) {
    //     // lineObj.setStyle(svgStyle);
    //     lineObj.setStyle({ strokeColor: "white", strokeWeight: 1 });
    //     this.lines.push(lineObj);
    //   }
    // }

    // arc

    // for (const line of svgLinesElementList) {
    //   const lineObj = this.processLine(line);
    //   if (lineObj) {
    //     // lineObj.setStyle(svgStyle);
    //     lineObj.setStyle({ strokeColor: "white", strokeWeight: 1 });
    //     this.lines.push(lineObj);
    //   }
    // }
  }

  // Moved to SVGPolygon--
  // gets points string data from polygon SVG element
  // calls pointsTo2DArray and assigns to this.ptArray (numbers)
  // static processPolygon = (poly: Element): SVGPolygon | null => {
  //   const pointsAsStringList = poly?.getAttribute("points")?.split(" ") || null;
  //   let ptArray;
  //   if (pointsAsStringList) {
  //     ptArray = this.pointStringListToPointObjArray(pointsAsStringList);
  //     if (ptArray) {
  //       const polygon = SVGFactory.createPolygon({
  //         points: ptArray,
  //       }) as SVGPolygon;
  //       return polygon;
  //     }
  //   }
  //   return null;
  // };

  // static processRect = (rect: Element): SVGRect | null => {
  //   const xString = rect?.getAttribute("x") || "0";
  //   const yString = rect?.getAttribute("y") || "0";
  //   const widthString = rect?.getAttribute("width");
  //   const heightString = rect?.getAttribute("height");
  //   let x;
  //   let y;
  //   let width;
  //   let height;
  //   if (xString && yString && widthString && heightString) {
  //     x = parseFloat(xString);
  //     y = parseFloat(yString);
  //     width = parseFloat(widthString);
  //     height = parseFloat(heightString);
  //     if (x && y && width && height) {
  //       const params = {
  //         x,
  //         y,
  //         width,
  //         height,
  //       };
  //       const rect: SVGRect = SVGFactory.createRect(params) as SVGRect;
  //       return rect;
  //     }
  //   }
  //   return null;
  // };

  // static drawCircles = (): void => {
  //   this.p.push();
  //   this.p.fill("green");
  //   this.p.stroke("white");
  //   this.p.strokeWeight(1);
  //   if (this.circles.length > 0) {
  //     for (const circ of this.circles) {
  //       this.p.circle(
  //         circ.center.x as number,
  //         circ.center.y as number,
  //         circ.radius
  //       );
  //     }
  //   }
  //   this.p.pop();
  // };

  // static drawLines = (): void => {
  //   // console.log("drawPolygon");
  //   // console.log(this.polygons);
  //   this.p.push();
  //   this.p.stroke("white");
  //   this.p.strokeWeight(3);
  //   // console.log("drawLines--this.lines.length: ", this.lines.length);
  //   if (this.lines.length > 0) {
  //     for (const line of this.lines) {
  //       // console.log("drawing line");
  //       // console.log(JSON.stringify);
  //       this.p.line(
  //         line.p1.x as number,
  //         line.p1.y as number,
  //         line.p2.x as number,
  //         line.p2.y as number
  //       );
  //     }
  //   }
  //   this.p.pop();
  // };

  // static drawPolygon = (): void => {
  // SVGPolygon.draw(this.p, this.polygons);
  // console.log("drawPolygon");
  // console.log(this.polygons);
  // this.p.push();
  // if (this.fillColor) {
  //   this.p.fill(this.fillColor);
  // }
  // this.p.stroke(this.strokeColor);
  // this.p.strokeWeight(this.strokeWeight);
  // this.p.beginShape();
  // if (this.polygons.length > 0) {
  //   for (const pg of this.polygons) {
  //     const ptArray = pg.points;
  //     for (const pt of ptArray) {
  //       this.p.vertex(pt.x as number, pt.y as number);
  //     }
  //   }
  // }
  // this.p.endShape(this.p.CLOSE);
  // this.p.pop();
  // };

  // static drawRectangles = (): void => {
  //   this.p.push();
  //   this.p.fill("blue");
  //   this.p.stroke("white");
  //   this.p.strokeWeight(1);
  //   if (this.rects.length > 0) {
  //     for (const rect of this.rects) {
  //       this.p.rect(
  //         rect.x as number,
  //         rect.y as number,
  //         rect.width as number,
  //         rect.height as number
  //       );
  //     }
  //   }
  //   this.p.pop();
  // };

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

  // static drawPaths = (): void => {
  // this.p.push();
  // this.p.fill("purple");
  // this.p.stroke("white");
  // this.p.strokeWeight(1);
  // if (this.paths.length > 0) {
  //   for (const path of this.paths) {
  //     for (const line of path.lines) {
  //       if (line !== null) {
  //         this.p.line(
  //           line.p1.x as number,
  //           line.p1.y as number,
  //           line.p2.x as number,
  //           line.p2.y as number
  //         );
  //       }
  //     }
  //   }
  // }
  // this.p.pop();
  // };

  static drawTextObjects = (): void => {
    this.p.push();
    this.p.pop();
    throw "drawTextObjects not yet implemented";
  };
  static drawImages = (): void => {
    this.p.push();
    this.p.pop();
    throw "drawImages not yet implemented";
  };

  static drawEllipses = (): void => {
    this.p.push();
    this.p.pop();
    throw "drawEllipses not yet implemented";
  };

  static drawAll = (): void => {
    SVGPolygon.drawList(SVGLoader.p, SVGLoader.polygons);
    SVGLine.drawList(SVGLoader.p, SVGLoader.lines);
    SVGCircle.drawList(SVGLoader.p, SVGLoader.circles);
    SVGRect.drawList(SVGLoader.p, SVGLoader.rects);
    SVGPath.drawList(SVGLoader.p, SVGLoader.paths);
    // SVGLoader.drawCircles();
    // SVGLoader.drawRectangles();
    // SVGLoader.drawArcs();
    // SVGLoader.drawTextObjects();
    // SVGLoader.drawImages();
    // SVGLoader.drawEllipses();
  };

  static registerRenderer = (p: p5): void => {
    this.p = p;
  };
}

export default SVGLoader;
