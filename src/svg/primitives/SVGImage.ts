import p5 from "p5";
import SVGImageParams from "./paramsdef/SVGImageParams.interface";
import Point from "./Point";
import SVGObject from "./SVGObject";
import SVGObjectType from "./SVGObjectTypes";
// import * as fs from "fs";
import SVGFactory from "../SVGFactory";
// if (fs.existsSync(path)) {
//   // File exists in path
// } else {
//   // File doesn't exist in path
// }

export class SVGImage extends SVGObject {
  public href: string;
  public img: p5.Image | null = null;
  public width: number;
  public height: number;
  public position: Point;

  constructor(params: SVGImageParams) {
    super(SVGObjectType.IMAGE, params.style);
    this.href = params.href;
    // this.img = renderer.loadImage(params.href);
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

  static override processList = (
    doc: Document,
    renderer?: p5 | null
  ): SVGImage[] => {
    if (renderer === null) {
      return [];
    }
    const images: SVGImage[] = [];
    if (doc) {
      const svgElementList = doc.querySelectorAll("image");
      for (const imageData of svgElementList) {
        const image = SVGImage.process(imageData, renderer);
        if (image) {
          images.push(image);
        }
      }
    }
    return images;
  };
  static process = (
    element: Element,
    renderer?: p5 | null
  ): SVGImage | null => {
    if (!renderer || renderer === null) {
      return null;
    }
    const href = element?.getAttribute("href");
    const xString = element?.getAttribute("x") || null;
    const yString = element?.getAttribute("y") || null;
    const widthString = element?.getAttribute("width") || null;
    const heightString = element?.getAttribute("height") || null;
    let x = 0;
    let y = 0;
    let w: number | null = null;
    let h: number | null = null;
    if (xString) {
      x = parseFloat(xString) || 0;
    }
    if (yString) {
      y = parseFloat(yString) || 0;
    }
    if (widthString) {
      w = parseFloat(widthString);
    }
    if (heightString) {
      h = parseFloat(heightString);
    }
    if (
      href &&
      typeof x === "number" &&
      typeof y === "number" &&
      typeof w === "number" &&
      typeof h === "number"
    ) {
      const imgPath = "w3examples/image/" + href;
      const img = renderer.loadImage(imgPath);
      const imgData = {
        href: imgPath,
        img,
        position: new Point(x, y),
        width: w,
        height: h,
      };
      const image = SVGFactory.createImage(imgData);
      image.img = img;
      return image;
    }
    return null;
  };

  static override drawList = (renderer: p5, elements: SVGObject[]): void => {
    elements.forEach((element) => {
      SVGImage.draw(renderer, element);
    });
  };
  static override draw = (renderer: p5, element: SVGObject): void => {
    if (element.type === SVGObjectType.IMAGE) {
      const svgImage = element as SVGImage;
      if (svgImage.img) {
        renderer.push();
        renderer.image(
          svgImage.img,
          svgImage.position.x,
          svgImage.position.y,
          svgImage.width,
          svgImage.height
        );
        renderer.pop();
      } else {
        console.warn("Image not loaded");
      }
    }
  };
}
export default SVGImage;
