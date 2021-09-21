export default class Star {
  /**
   * @param {number} angle 
   * @param {number} distance 
   * @param {string} name
   * @param {Star} star
   * @param {number} resources
   */
  constructor(angle, distance, name, star, resources, player) {
    this.angle = angle
    this.distance = distance
    this.name = name
    this.star = star
    this.resources = resources
    this.player = player
  }

  /** @type {number} */
  get x() {
    return Math.cos(this.angle) * this.distance + (this.star?.x ?? 0)
  }

  /** @type {number} */
  get y() {
    return Math.sin(this.angle) * this.distance + (this.star?.y ?? 0)
  }

  /** @param {Star} star */
  distanceTo(star) {
    return Math.sqrt(Math.pow((this.x - star.x), 2) + Math.pow((this.y - star.y), 2))
  }
}
