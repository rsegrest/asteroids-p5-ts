import SVGPathParams from "./paramsdef/SVGPathParams.interface";
import SVGLine from "./SVGLine";
import SVGObject from "./SVGObject";
import SVGObjectType from "./SVGObjectTypes";

export class SVGPath extends SVGObject {
  public lines: SVGLine[] = [];

  constructor(params: SVGPathParams) {
    super(SVGObjectType.PATH, params.style);
    this.lines = params.lines;
  }

  static create = (params: SVGPathParams): SVGPath => {
    return new SVGPath(params);
  };

  toSVGString = (): string => {
    return this.lines.map((line) => line.toSVGString()).join(" ");
  };
  toString = (): string => {
    return `Path with ${this.lines.length} lines`;
  };
}
export default SVGPath;
