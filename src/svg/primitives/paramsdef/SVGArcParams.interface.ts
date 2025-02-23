import SVGCircleParams from "./SVGCircleParams.interface";

export interface SVGArcParams extends SVGCircleParams {
  startAngle: number;
  endAngle: number;
}
export default SVGArcParams;
