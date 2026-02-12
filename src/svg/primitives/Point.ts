export class Point {
  constructor(public readonly x: number, public readonly y: number) {}

  // static fromString
  static from2DArray = (arr: number[]): Point | null => {
    if (arr.length !== 2) {
      console.warn("Error: Array length is not 2");
      return null;
    }
    if (!arr[0] || !arr[1]) {
      console.warn("Error: x or y is null");
      return null;
    }
    return new Point(arr[0], arr[1]);
  };
  // to2DArray
  // toString
}
export default Point;
