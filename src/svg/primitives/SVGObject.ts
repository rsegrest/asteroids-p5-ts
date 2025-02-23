import type SVGObjectType from "./SVGObjectTypes";
import type SVGStyle from "./SVGStyle";

export abstract class SVGObject {
  private style: SVGStyle;

  constructor(
    public readonly type: SVGObjectType,
    style: SVGStyle | null = null
  ) {
    this.style = style || {};
  }

  getStyle = (): SVGStyle => {
    return this.style;
  };

  setStyle = (style: SVGStyle): void => {
    this.style = style;
  };

  setFillColor = (fillColor: string): void => {
    this.style.fillColor = fillColor;
  };
  setStrokeColor = (strokeColor: string): void => {
    this.style.strokeColor = strokeColor;
  };
  setStrokeWeight = (strokeWeight: number): void => {
    this.style.strokeWeight = strokeWeight;
  };
  abstract toSVGString(): string;
  abstract toString(): string;
  //  => {
  //   return "abstract toSVGString";
  // };
  //  {
  //   return "abstract toString";
  // };
  // abstract makeSound(input : string) : string;
  static process = (element: Element): SVGObject | null => {
    throw "abstract process element : " + element;
  };
  static processList = (doc: Document): SVGObject[] => {
    throw "abstract process doc : " + doc;
  };
  draw = (): void => {
    console.warn("abstract draw");
  };
}
export default SVGObject;
