import { Point } from './cartesian_system'

export class PictureContext {
  name: string
  points: Point[] = []
  instanceCount: number = 0

  constructor(public start: Point, public end: Point) {
    this.points.push(start)
    this.points.push(end)
  }

  addPoint(point: Point) {
    this.end = point
    this.points.push(point)
  }

  getLeastSignificantPoint(): Point {
    //noinspection TypeScriptValidateTypes
    return this.reducePoints(Math.min, {
      x: Number.MAX_SAFE_INTEGER,
      y: Number.MAX_SAFE_INTEGER
    })
  }

  getMostSignificantPoint(): Point {
    //noinspection TypeScriptValidateTypes
    return this.reducePoints(Math.max, {
      x: Number.MIN_SAFE_INTEGER,
      y: Number.MIN_SAFE_INTEGER
    })
  }

  getWidth(): number {
    return Math.abs(this.start.x - this.end.x)
  }

  getHeight(): number {
    return Math.abs(this.start.y - this.end.y)
  }

  private reducePoints(func, initPoint: Point): Point {
    return this.points.reduce((acc, point) => ({
      x: func(acc.x, point.x),
      y: func(acc.y, point.y)
    }), initPoint)
  }
}
