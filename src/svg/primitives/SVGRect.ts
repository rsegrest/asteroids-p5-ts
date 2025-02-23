import p5 from "p5";
import SVGFactory from "../SVGFactory";
import SVGRectParams from "./paramsdef/SVGRectParams.interface";
import SVGObject from "./SVGObject";
import SVGObjectType from "./SVGObjectTypes";

export class SVGRect extends SVGObject {
  public x: number;
  public y: number;
  public width: number;
  public height: number;

  constructor(params: SVGRectParams) {
    super(SVGObjectType.RECT, params.style);
    this.x = params.x;
    this.y = params.y;
    this.width = params.width;
    this.height = params.height;
  }
  static create = (params: SVGRectParams): SVGRect => {
    return new SVGRect(params);
  };
  toSVGString = (): string => {
    return `<rect x="${this.x}" y="${this.y}" width="${this.width}" height="${this.height}" />`;
  };
  toString = (): string => {
    return `Rectangle at (${this.x}, ${this.y}) with width ${this.width} and height ${this.height}`;
  };

  static override processList = (doc: Document | null): SVGRect[] => {
    const rectList: SVGRect[] = [];
    if (doc) {
      const elements = doc.getElementsByTagName("rect");
      for (let i = 0; i < elements.length; i++) {
        const rectData = elements[i];
        if (rectData) {
          const rect = SVGRect.process(rectData) as SVGRect;
          if (rect) {
            rectList.push(rect);
          }
        }
      }
    }
    return rectList;
  };

  static process = (element: Element): SVGRect | null => {
    const xString = element?.getAttribute("x") || "0";
    const yString = element?.getAttribute("y") || "0";
    const widthString = element?.getAttribute("width");
    const heightString = element?.getAttribute("height");
    let x;
    let y;
    let width;
    let height;
    if (xString && yString && widthString && heightString) {
      x = parseFloat(xString);
      y = parseFloat(yString);
      width = parseFloat(widthString);
      height = parseFloat(heightString);
      if (
        typeof x === "number" &&
        typeof y === "number" &&
        typeof width === "number" &&
        typeof height === "number"
      ) {
        const params = {
          x,
          y,
          width,
          height,
        };
        const rect: SVGRect = SVGFactory.createRect(params) as SVGRect;
        return rect;
      }
    }
    return null;
  };

  static override drawList = (renderer: p5, elements: SVGObject[]): void => {
    for (const element of elements) {
      SVGObject.setStyle(renderer, element.getStyle());
      if (elements.length > 0) {
        for (const rect of elements) {
          SVGRect.draw(renderer, rect);
          // renderer.push();
          // renderer.beginShape();
          // renderer.rect(rect.x, rect.y, rect.width, rect.height);
          // renderer.endShape(renderer.CLOSE);
          // renderer.pop();
        }
      }
    }
  };
  static override draw = (renderer: p5, element: SVGObject): void => {
    renderer.push();
    const rect = element as SVGRect;
    renderer.rect(rect.x, rect.y, rect.width, rect.height);
    renderer.pop();
  };
}
export default SVGRect;
