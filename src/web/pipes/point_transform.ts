import { PipeTransform, Pipe } from 'angular2/core'
import { Point } from 'src/dvu/geometry/cartesian_system'

@Pipe({
  name: 'point'
})
export class PointTransform implements PipeTransform {
  transform(point: Point): string {
    return point? `(${point.x}, ${point.y})`: ''
  }
}
