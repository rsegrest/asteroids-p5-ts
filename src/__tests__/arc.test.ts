import SVGArc from "../svg/primitives/SVGArc";

const getMidpoint = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
): {
  x_m: number;
  y_m: number;
} => {
  const x_m = (x1 + x2) / 2;
  const y_m = (y1 + y2) / 2;
  return { x_m, y_m };
};

const getAdjustedCoordinates = (
  xRotTheta: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number
): {
  x1_prime: number;
  y1_prime: number;
} => {
  const { x_m, y_m } = SVGArc.getMidpoint(x1, y1, x2, y2);
  const x1_prime =
    Math.cos(xRotTheta) * (x1 - x_m) - Math.sin(xRotTheta) * (y1 - y_m);
  const y1_prime =
    -Math.sin(xRotTheta) * (x1 - x_m) + Math.cos(xRotTheta) * (y1 - y_m);
  return { x1_prime, y1_prime };
};

const computeLambda = (
  xRotTheta: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  radiusX: number,
  radiusY: number
): number => {
  // a is semi-major axis / x-radius
  // b is semi-minor axis / y-radius
  const a = radiusX;
  const b = radiusY;
  const { x1_prime, y1_prime } = SVGArc.getAdjustedCoordinates(
    xRotTheta,
    x1,
    y1,
    x2,
    y2
  );
  const lhs = Math.pow(x1_prime, 2) / Math.pow(a, 2);
  const rhs = Math.pow(y1_prime, 2) / Math.pow(b, 2);
  const equationResult = lhs + rhs;
  const lambda = Math.sqrt(1 / equationResult);
  return lambda;
};
const computeCenterOffset = (
  xRotTheta: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  radiusX: number,
  radiusY: number
): {
  cx_prime: number;
  cy_prime: number;
} => {
  const lambda = SVGArc.computeLambda(
    xRotTheta,
    x1,
    y1,
    x2,
    y2,
    radiusX,
    radiusY
  );
  const { x1_prime, y1_prime } = SVGArc.getAdjustedCoordinates(
    xRotTheta,
    x1,
    y1,
    x2,
    y2
  );

  const a = radiusX;
  const b = radiusY;
  // plus or minus, depending on the arc's direction
  const cx_prime = (lambda * (y1_prime * a)) / b;
  const cy_prime = (lambda * (x1_prime * b)) / a;
  return { cx_prime, cy_prime };
};
const transformBack = (
  x1: number,
  y1: number,
  radiusX: number,
  radiusY: number,
  xRotTheta: number,
  x2: number,
  y2: number
): {
  h: number;
  k: number;
} => {
  const { x_m, y_m } = SVGArc.getMidpoint(x1, y1, x2, y2);
  const { cx_prime, cy_prime } = SVGArc.computeCenterOffset(
    xRotTheta,
    x1,
    y1,
    x2,
    y2,
    radiusX,
    radiusY
  );
  const h =
    x_m + (cx_prime * Math.cos(xRotTheta) - cy_prime * Math.sin(xRotTheta));
  const k =
    y_m + (cx_prime * Math.sin(xRotTheta) + cy_prime * Math.cos(xRotTheta));
  return { h, k };
};

// SVG Command
// svg
// <path d="M 100 100 A 50 50 0 0 1 200 100" />
// Start: (100, 100)
// End: (200, 100)
// rx = 50, ry = 50
// x-axis-rotation = 0
// large-arc-flag = 0 (small arc)
// sweep-flag = 1 (clockwise)
// Step 1: Radii to Width/Height
// rx = 50, ry = 50
// width = 2 * 50 = 100, height = 2 * 50 = 100
// Step 2: Calculate Center
// For a simple horizontal arc with no rotation:
// Start (100, 100) to end (200, 100) with rx = 50, ry = 50.
// Center is midway horizontally and vertically aligned: (cx, cy) = (150, 100) (simplified case; exact center requires full computation).

// Step 3: Start and End Angles
// Start point (100, 100) relative to center (150, 100):
// atan2(100 - 100, 100 - 150) = atan2(0, -50) = PI (180 degrees, left side).
// End point (200, 100) relative to center (150, 100):
// atan2(100 - 100, 200 - 150) = atan2(0, 50) = 0 (0 degrees, right side).
// Angles in radians: start = PI, stop = 0.
// Step 4: Adjust for Sweep
// sweep-flag = 1 (clockwise). From PI (180°) to 0 (0°) clockwise is a small arc (180°), matching large-arc-flag = 0.
// p5.js is counterclockwise, so reverse: start = 0, stop = PI.
const radiiToWidthHeight = (
  rx: number,
  ry: number
): { width: number; height: number } => {
  const width = 2 * rx;
  const height = 2 * ry;
  return { width, height };
};
const calcCenter = (
  sx: number,
  sy: number,
  ex: number,
  ey: number
  // rx: number,
  // ry: number,
) => {
  const cx = (sx + ex) / 2;
  const cy = (sy + ey) / 2;
  return { cx, cy };
};

const startAndEndAngles = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  sweepFlag = false
) => {
  const start = Math.atan2(y1 - y2, x1 - x2);
  const end = Math.atan2(y2 - y1, x2 - x1);
  if (sweepFlag) {
    return { start: end, end: start };
  }
  return { start, end };
};
interface SvgArcParams {
  x1: number; // Start x-coordinate
  y1: number; // Start y-coordinate
  rx: number; // X-radius
  ry: number; // Y-radius
  rotation: number; // X-axis rotation in degrees
  largeArc: number; // Large arc flag (0 or 1)
  sweep: number; // Sweep flag (0 or 1)
  x2: number; // End x-coordinate
  y2: number; // End y-coordinate
}

interface P5ArcParams {
  x: number; // Center x
  y: number; // Center y
  width: number; // Ellipse width (diameter)
  height: number; // Ellipse height (diameter)
  start: number; // Start angle in radians
  stop: number; // Stop angle in radians
}

/**
 * Converts SVG arc parameters to p5.js arc() parameters.
 * @param params SVG arc parameters from an 'A' command
 * @returns Parameters compatible with p5.js arc()
 */
function svgArcToP5(params: SvgArcParams): P5ArcParams {
  const { x1, y1, rx, ry, rotation, largeArc, sweep, x2, y2 } = params;

  // Convert rotation from degrees to radians
  const phi = (rotation * Math.PI) / 180;

  // Step 1: Compute transformed coordinates (account for rotation)
  const dx = (x1 - x2) / 2;
  const dy = (y1 - y2) / 2;
  const x1p = Math.cos(phi) * dx + Math.sin(phi) * dy;
  const y1p = -Math.sin(phi) * dx + Math.cos(phi) * dy;

  // Step 2: Ensure radii are large enough (simplified, assumes valid input)
  let rxAbs = Math.abs(rx);
  let ryAbs = Math.abs(ry);

  // Step 3: Compute center in transformed space
  const d = (x1p * x1p) / (rxAbs * rxAbs) + (y1p * y1p) / (ryAbs * ryAbs);
  if (d > 1) {
    // Radii too small, scale up (SVG spec behavior)
    const scale = Math.sqrt(d);
    rxAbs *= scale;
    ryAbs *= scale;
  }
  const coef =
    (largeArc === sweep ? -1 : 1) *
    Math.sqrt(
      Math.max(
        0,
        (rxAbs * rxAbs * ryAbs * ryAbs -
          rxAbs * rxAbs * y1p * y1p -
          ryAbs * ryAbs * x1p * x1p) /
          (rxAbs * rxAbs * y1p * y1p + ryAbs * ryAbs * x1p * x1p)
      )
    );
  const cxp = (coef * rxAbs * y1p) / ryAbs;
  const cyp = (-coef * ryAbs * x1p) / rxAbs;

  // Step 4: Transform center back to original coordinates
  const cx = Math.cos(phi) * cxp - Math.sin(phi) * cyp + (x1 + x2) / 2;
  const cy = Math.sin(phi) * cxp + Math.cos(phi) * cyp + (y1 + y2) / 2;

  // Step 5: Compute start and end angles
  const startAngle = angleBetween(
    1,
    0,
    (x1p - cxp) / rxAbs,
    (y1p - cyp) / ryAbs
  );
  let deltaAngle = angleBetween(
    (x1p - cxp) / rxAbs,
    (y1p - cyp) / ryAbs,
    (-x1p - cxp) / rxAbs,
    (-y1p - cyp) / ryAbs
  );

  // Adjust delta based on flags
  if (sweep === 0 && deltaAngle > 0) deltaAngle -= 2 * Math.PI;
  if (sweep === 1 && deltaAngle < 0) deltaAngle += 2 * Math.PI;

  // Incorporate rotation into angles
  let start = startAngle + phi;
  let stop = start + deltaAngle;

  // Step 6: Adjust for p5.js (counterclockwise, swap if sweep = 0)
  if (sweep === 0) {
    [start, stop] = [stop, start]; // Reverse direction for counterclockwise
  }

  // Normalize angles to [0, 2π]
  const normalizeAngle = (angle: number) =>
    ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  return {
    x: cx,
    y: cy,
    width: rxAbs * 2,
    height: ryAbs * 2,
    start: normalizeAngle(start),
    stop: normalizeAngle(stop),
  };
}

/**
 * Helper function to compute angle between two vectors.
 * @param ux First vector x
 * @param uy First vector y
 * @param vx Second vector x
 * @param vy Second vector y
 * @returns Angle in radians
 */
function angleBetween(ux: number, uy: number, vx: number, vy: number): number {
  const dot = ux * vx + uy * vy;
  const mag = Math.sqrt(ux * ux + uy * uy) * Math.sqrt(vx * vx + vy * vy);
  let theta = Math.acos(Math.min(1, Math.max(-1, dot / mag)));
  if (ux * vy - uy * vx < 0) theta = -theta; // Sign based on cross product
  return theta;
}

// Example usage with your SVG arc
const svgArc: SvgArcParams = {
  x1: 150,
  y1: 50,
  rx: 50,
  ry: 50,
  rotation: 0,
  largeArc: 0,
  sweep: 1,
  x2: 200,
  y2: 100,
};

describe("Arc tests", () => {
  xit("should convert an arc from svg to p5.js", () => {
    // const { h, k } = transformBack(
    //   // 100 100 A 50 50 0 0 1 200 100
    //   100,
    //   100,
    //   50,
    //   50,
    //   0,
    //   200,
    //   100
    // );
    // expect(h).toBe(150);
    // expect(k).toBe(50);
    const { width, height } = radiiToWidthHeight(50, 50);
    expect(width).toBe(100);
    expect(height).toBe(100);
    const { cx, cy } = calcCenter(100, 100, 200, 100); // , 50, 50);
    expect(cx).toBe(150);
    expect(cy).toBe(100);

    const { start, end } = startAndEndAngles(100, 100, 200, 100);
    expect(start).toBe(Math.PI);
    expect(end).toBe(0);
  });
  it("should convert", () => {
    const p5Arc = svgArcToP5(svgArc);
    expect(p5Arc).toStrictEqual({
      height: 100,
      start: 4.71238898038469,
      stop: 0,
      width: 100,
      x: 150,
      y: 100,
    });
  });
});
