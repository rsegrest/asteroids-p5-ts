import p5 from "p5";
import SVGFactory from "../SVGFactory";
import SVGPolygonParams from "./paramsdef/SVGPolygonParams.interface";
import Point from "./Point";
import SVGObject from "./SVGObject";
import SVGObjectType from "./SVGObjectTypes";

export class SVGPolygon extends SVGObject {
  public points: Point[];
  constructor(params: SVGPolygonParams) {
    super(SVGObjectType.POLYGON, params.style);
    this.points = params.points;
  }

  static create = (points: Point[]): SVGPolygon => {
    return SVGFactory.createPolygon({ points });
  };
  override toSVGString = (): string => {
    return `<polygon points="${this.points
      .map((point) => `${point.x},${point.y}`)
      .join(" ")}" />`;
  };
  override toString = (): string => {
    return `Polygon with ${this.points.length} points`;
  };

  static override processList = (doc: Document | null): SVGPolygon[] => {
    const polygons: SVGPolygon[] = [];
    if (doc) {
      const svgElementList = doc.querySelectorAll("polygon");
      for (const poly of svgElementList) {
        const polygon = SVGPolygon.process(poly);
        if (polygon) {
          polygons.push(polygon);
        }
      }
    }
    return polygons;
  };

  static override process = (element: Element): SVGPolygon | null => {
    const pointsAsStringList =
      element?.getAttribute("points")?.split(" ") || null;
    let ptArray;
    if (pointsAsStringList) {
      ptArray = SVGFactory.pointStringListToPointObjArray(pointsAsStringList);
      if (ptArray) {
        const polygon = SVGFactory.createPolygon({
          points: ptArray,
        }) as SVGPolygon;
        return polygon;
      }
    }
    return null;
  };
  static override draw = (renderer: p5, element: SVGObject): void => {
    renderer.push();
    const polygon = element as SVGPolygon;
    const ptArray = polygon.points;
    renderer.beginShape();
    for (const pt of ptArray) {
      renderer.vertex(pt.x as number, pt.y as number);
    }
    renderer.endShape(renderer.CLOSE);
    renderer.pop();
  };
  static override drawList = (renderer: p5, elements: SVGObject[]): void => {
    for (const element of elements) {
      SVGObject.setStyle(renderer, element.getStyle());
      if (elements.length > 0) {
        for (const pg of elements) {
          const polygon = pg as SVGPolygon;
          this.draw(renderer, polygon);
        }
      }
    }
  };
}
export default SVGPolygon;
