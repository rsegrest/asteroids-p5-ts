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

let polygons;

function loadSVG(p: p5, filename?: string) {
  console.log("preload");
  // const textFile = loadStrings('quick-svg-from-ai.svg', doText);
  // console.log(textFile);
  const lines = p.loadStrings("quick-svg-from-ai.svg");
  // console.log(lines.length);
  // svgString = lines.join("")
  // console.log(lines)
  // console.log(svgString);
  return lines;
}

function pointsTo2DArray(points: string[]) {
  console.log(points);
  const ptArray: Array<Array<number>> = [];
  for (let pt of points) {
    const xyArray = pt.split(",");
    if (xyArray.length > 1) {
      let [x, y] = pt.split(",");
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
  return ptArray;
}

function processPolygon(p: p5, poly: Element) {
  let points = poly?.getAttribute("points")?.split(" ");
  const ptArray = pointsTo2DArray(points as string[]);
  drawPolygon(p, ptArray as number[][]);
  // console.log(ptArray);
  // return ptArray;
}

function drawPolygon(p: p5, ptArray: Array<Array<number>>) {
  p.push();
  p.beginShape();
  for (let pt of ptArray) {
    p.vertex(pt[0] as number, pt[1] as number);
  }
  p.endShape(p.CLOSE);
  p.pop();
}

function processSVG(p: p5, lines: string[]) {
  const svgString = lines?.join("\n");
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, "image/svg+xml");
  let polygons = doc.querySelectorAll("polygon");

  // console.log(polygons)
  // console.log(polygons.length)
  // const poly = polygons[0];
  for (let poly of polygons) {
    // console.log("poly:");
    // console.log(poly);
    processPolygon(p, poly);
  }
}

// function draw() {
//   background(220);
//   circle(10,10,10);
//   for (let i = 0; i < lines.length; i += 1) {
//     text(svgString, 5, 20+(20));
//   }

// }
