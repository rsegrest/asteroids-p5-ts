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
      if (x && y && width && height) {
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
}
export default SVGRect;
