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
}
export default SVGRect;
