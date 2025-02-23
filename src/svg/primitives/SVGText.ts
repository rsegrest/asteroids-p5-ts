import SVGTextParams from "./paramsdef/SVGTextParams.interface";
import SVGObject from "./SVGObject";
import SVGObjectType from "./SVGObjectTypes";

export class SVGText extends SVGObject {
  public x: number;
  public y: number;
  public content = "";

  constructor(params: SVGTextParams) {
    super(SVGObjectType.TEXT, params.style);
    this.x = params.x;
    this.y = params.y;
    this.content = params.content;
  }
  static create = (params: SVGTextParams): SVGText => {
    return new SVGText(params);
  };
  toSVGString = (): string => {
    return `<text x="${this.x}" y="${this.y}">${this.content}</text>`;
  };
  toString = (): string => {
    return `Text at (${this.x}, ${this.y}) with content ${this.content}`;
  };
}
export default SVGText;
