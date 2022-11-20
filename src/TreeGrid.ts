import { Pt, Bound } from "pts";

/**
 * A grid of trees (points) over a given bound
 */
export class TreeGrid {
  #stemsHA: number; // stems / (100m)^2
  #bound: Bound; // [x meters, y meters]
  #pixelsPerMeter: number; // pixels / meter
  #spacing: number; // meters
  #xDistBetween: number; // meters
  #yDistBetween: number; // meters
  #trees: Array<Pt>;

  /**
   * Create a TreeGrid by passing the stems-per-hectare value, custom spacing,
   * and bound area.
   * @param {number} stemsHA stems-per-hectare value
   * @param {Bound} bound bound area to create trees (points) in
   * @param {number} pixelsPerMeter conversion factor
   * @param {number} [spacing] custom horizontal spacing
   */
  constructor(
    stemsHA: number,
    bound: Bound,
    pixelsPerMeter: number,
    spacing: number = 0
  ) {
    this.#stemsHA = stemsHA;
    this.#bound = bound;
    this.#pixelsPerMeter = pixelsPerMeter;
    this.#spacing = spacing;
    this.#xDistBetween = 0;
    this.#yDistBetween = 0;
    this.#trees = [];
  }

  /**
   * The grid of trees (points)
   */
  get trees(): Array<Pt> {
    if (this.#trees.length === 0) this.#generateGrid();
    return this.#trees;
  }

  /**
   * The horizontal distance between trees in meters
   */
  get xDistBetween(): number {
    return this.#xDistBetween;
  }

  /**
   * The vertical distance between trees in meters
   */
  get yDistBetween(): number {
    return this.#yDistBetween;
  }

  /**
   * The bounding area of the tree grid
   */
  set bound(b: Bound) {
    this.#bound = b;
  }

  /**
   * The number of pixels per "meter"
   */
  set pixelsPerMeter(ppm: number) {
    this.#pixelsPerMeter = ppm;
  }

  /**
   * Update the tree grid externally
   */
  update(): void {
    this.#generateGrid();
  }

  /**
   * Generate grid of trees. We start from the center of the bound and work
   *  outward to ensure the grid is centered.
   */
  #generateGrid(): void {
    let center: Pt = this.#bound.center;
    console.log(this.#spacing);

    // Find distance between trees using stems-per-hectare and convert to pixels
    let xInc: number = (100 / Math.sqrt(this.#stemsHA)) * this.#pixelsPerMeter;
    let yInc: number = (100 / Math.sqrt(this.#stemsHA)) * this.#pixelsPerMeter;

    let i: number = 0;
    let j: number = 0;

    do {
      do {
        // Add tree to grid
        this.#trees.push(new Pt([center.x + i * xInc, center.y + j * yInc]));
        // If outside (padded) bound, flip sign to fill other side of center
        if (center.y + j * yInc > this.#bound.height * 1.25) j *= -1;
        j++;
      } while (j != 0); // End when we get back to the center

      // If outside (padded) bound, flip sign to fill other side of center
      if (center.x + i * xInc > this.#bound.width * 1.25) i *= -1;
      i++;
    } while (i != 0); // End when we get back to the center
  }
}
