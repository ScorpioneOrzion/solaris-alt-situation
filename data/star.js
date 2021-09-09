export default class Star {
  /**
   * 
   * @param {number} angle 
   * @param {number} distance 
   * @param {string} name
   * @param {Star} star
   */
  constructor(angle, distance, name, star) {
    this.angle = angle
    this.distance = distance
    this.name = name
    this.star = star
  }

  /** @type {number} */
  get x() {
    return Math.cos(this.angle) * this.distance + (this.star.x ?? 0)
  }

  /** @type {number} */
  get y() {
    return Math.sin(this.angle) * this.distance + (this.star.y ?? 0)
  }
}
