import { Point } from '../geometry/cartesian_system'

interface NamedPoint {
  name: string
  point: Point
}

export class Magnet implements NamedPoint {
  constructor(public name: string, public point: Point) {
  }

  clone(name: string): Magnet {
    return new Magnet(name || this.name, { x: this.point.x, y: this.point.y })
  }
}
