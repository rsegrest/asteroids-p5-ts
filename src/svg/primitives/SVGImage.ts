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
    console.log("processing image list");
    if (doc) {
      console.log("doc is here");
      const svgElementList = doc.querySelectorAll("image");
      console.log("svgElementList:");
      console.log(svgElementList);
      for (const imageData of svgElementList) {
        console.log("imageData:");
        console.log(imageData);
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
      console.log("NO RENDERER");
      return null;
    }
    console.log("processing image");
    // static processLine = (line: Element): SVGLine | null => {
    const href = element?.getAttribute("href");
    const xString = element?.getAttribute("x") || null;
    const yString = element?.getAttribute("y") || null;
    const widthString = element?.getAttribute("width") || null;
    const heightString = element?.getAttribute("height") || null;
    console.log("href, xString, yString, widthString, heightString:");
    console.log(href);
    console.log(xString);
    console.log(yString);
    console.log(widthString);
    console.log(heightString);
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
    console.log("x, y, w, h:");
    console.log(x);
    console.log(y);
    console.log(w);
    console.log(h);

    if (
      href &&
      typeof x === "number" &&
      typeof y === "number" &&
      typeof w === "number" &&
      typeof h === "number"
    ) {
      const imgPath = "w3examples/image/" + href;
      // console.log("img file Exists?:");
      // console.log(imgExists);
      const img = renderer.loadImage(imgPath);
      console.log("img:");
      console.log(img);
      // console.log("img:");
      // console.log(img);
      // if (element.img) {
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
      // }
    }
    // else {
    // console.warn("Image not loaded");
    // }

    // console.log("points are valid numbers");
    // const line = SVGFactory.createImage({

    // p1: new Point(x1, y1),
    // p2: new Point(x2, y2),
    // });
    // console.log("line:");
    // console.log(JSON.stringify(line));
    // return line;
    // }
    // }
    // return null;
    // };
    return null;
  };

  static override drawList = (renderer: p5, elements: SVGObject[]): void => {
    console.log("draw image list of " + elements.length + " elements");
    elements.forEach((element) => {
      SVGImage.draw(renderer, element);
      // if (element.type === SVGObjectType.IMAGE) {
      //   const imgData = element as SVGImage;
      //   const img = renderer.loadImage((element as SVGImage).href);
      //   renderer.image(
      //     img,
      //     imgData.position.x,
      //     imgData.position.y,
      //     imgData.width,
      //     imgData.height
      //   );
      // }
    });
  };
  static override draw = (renderer: p5, element: SVGObject): void => {
    if (element.type === SVGObjectType.IMAGE) {
      const svgImage = element as SVGImage;
      console.log("drawing image");
      console.log(svgImage);
      if (svgImage.img) {
        console.log("img data is loaded; drawing image");
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
