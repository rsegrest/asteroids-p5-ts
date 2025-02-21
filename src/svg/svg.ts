import p5 from "p5";

// TODO: Generate Shape
// TODO: Get Fill, Stroke, Stroke Weight

// TODO: Generate Polygon on screen
// TODO: Process Circle
// TODO: Process Ellipse
// TODO: Process Line
// TODO: Process Arc
// TODO: Process Rect
// TODO: Process Bezier Curve

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

// let lines = [];
// let i = 0;
// let svgString = "";

// TODO: SVG Object

export enum SVGObjectType {
  POLYGON = "polygon",
  CIRCLE = "circle",
  ELLIPSE = "ellipse",
  LINE = "line",
  ARC = "arc",
  RECT = "rect",
  BEZIER_CURVE = "bezierCurve",
}

export class SVGObject {
  constructor(
    public readonly type: SVGObjectType,
    public readonly points: string[],
    public readonly fillColor: string,
    public readonly strokeColor: string,
    public readonly strokeWeight: number
  ) {}
}

export class SVGLoader {
  // TODO: Add SVGObject[] to store all SVGObjects
  private static svgPolygonElementList: any | any[] = [];
  private static lines: string[] = [];
  private static points: string[] | null = null;
  private static ptArray: Array<Array<number>> | null = [];
  private static fillColor = "pink";
  private static strokeColor = "white";
  private static strokeWeight = 1;
  public static p: p5;

  constructor(p: p5) {
    SVGLoader.p = p;
  }

  static handleSvgData = (data: string[]): void => {
    this.lines = data;
    this.processSVG(); // populates this.polygons (Raw SVG Elements)
  };
  // called from PRELOAD
  static loadSVG = (filename: string | null = null): void => {
    console.log("loadSVG");
    console.log(this.p);
    if (filename) {
      this.lines = this.p.loadStrings(filename, (data: any) =>
        this.handleSvgData(data)
      );
    }
  };

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

  // Pulls Polygon XML data from SVG
  static processSVG(): any {
    const svgString = this.lines?.join("\n");
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, "image/svg+xml");
    this.svgPolygonElementList = doc.querySelectorAll("polygon");
    const svgStyle = doc.querySelectorAll("style");
    const svgClass = this.svgPolygonElementList[0]?.getAttribute("class");
    if (svgStyle.length > 0) {
      console.log("this style:");
      console.log(svgStyle[0]?.innerHTML);
      // TODO: match style name to polygon class
      const styleName = svgStyle[0]?.innerHTML?.split("{")[0];
      const styleValue = svgStyle[0]?.innerHTML?.split("{")[1];
      const styleAttributes = styleValue?.split(";");
      if (styleAttributes && styleAttributes.length > 0) {
        for (const attr of styleAttributes) {
          const [key, value] = attr.split(":");
          if (key === "fill") {
            if (value) {
              console.log("for fill, found value:", value);
              this.fillColor = value;
            }
          } else if (key === "stroke") {
            if (value) {
              console.log("for stroke color, found value:", value);
              this.strokeColor = value;
            }
          } else if (key === "stroke-width") {
            if (value) {
              console.log("for stroke width, found value:", value);
              this.strokeWeight = parseFloat(value);
            }
          }
        }
      }
    }

    for (const poly of this.svgPolygonElementList) {
      this.processPolygon(poly); // calls points to 2D array
      // this.ptArray now available
    }
  }

  // converts this.points string to 2D this.ptArray of numbers
  static pointsTo2DArray = (): void => {
    console.log(this.points);
    const ptArray: Array<Array<number>> = [];
    if (this.points) {
      for (const pt of this.points) {
        const xyArray = pt.split(",");
        if (xyArray.length > 1) {
          const [x, y] = pt.split(",");
          if (x && y) {
            if (typeof x === "string" && typeof y === "string") {
              const xNum = parseFloat(x);
              const yNum = parseFloat(y);
              if (isNaN(xNum) || isNaN(yNum)) {
                console.log("Error: x or y is not a number");
                return;
              }
              ptArray.push([xNum, yNum]);
            }
          }
        }
      }
    }
    this.ptArray = ptArray;
  };

  // gets points string data from polygon SVG element
  // calls pointsTo2DArray and assigns to this.ptArray (numbers)
  static processPolygon = (poly: Element): void => {
    this.points = poly?.getAttribute("points")?.split(" ") || null;
    if (this.points) {
      this.pointsTo2DArray();
    }
    // this.drawPolygon();
  };

  static drawPolygon = (): void => {
    this.p.push();
    if (this.fillColor) {
      this.p.fill(this.fillColor);
    }
    this.p.stroke(this.strokeColor);
    this.p.strokeWeight(this.strokeWeight);
    this.p.beginShape();
    if (this.ptArray) {
      for (const pt of this.ptArray) {
        this.p.vertex(pt[0] as number, pt[1] as number);
      }
    }
    this.p.endShape(this.p.CLOSE);
    this.p.pop();
  };

  static registerRenderer = (p: p5): void => {
    this.p = p;
  };

  // TODO: update to use SVGObject
  // displayPolygons = (): void => {
  //   // console.log(polygons);
  //   // console.log(polygons.length);
  //   for (const poly of this.svgPolygonElementList) {
  //     this.processPolygon(poly);
  //   }
  // };
}

export default SVGLoader;
