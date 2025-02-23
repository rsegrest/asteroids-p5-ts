import SVGImageParams from "./paramsdef/SVGImageParams.interface";
import Point from "./Point";
import SVGObject from "./SVGObject";
import SVGObjectType from "./SVGObjectTypes";

export class SVGImage extends SVGObject {
  public href: string;
  public width: number;
  public height: number;
  public position: Point;

  constructor(params: SVGImageParams) {
    super(SVGObjectType.IMAGE, params.style);
    this.href = params.href;
    this.width = params.width;
    this.height = params.height;
    this.position = params.position;
  }

  static create = (params: SVGImageParams): SVGImage => {
    return new SVGImage(params);
  };

  toSVGString = (): string => {
    return `<image x="${this.position.x}" y="${this.position.y}" width="${this.width}" height="${this.height}" xlink:href="${this.href}" />`;
  };
  toString = (): string => {
    return `Image at (${this.position.x}, ${this.position.y}) with width ${this.width} and height ${this.height}`;
  };
}
export default SVGImage;
