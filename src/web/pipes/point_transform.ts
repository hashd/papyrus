import { PipeTransform, Pipe } from 'angular2/core'
import { Point } from 'src/dvu/geometry/cartesian_system'

@Pipe({
  name: 'point'
})
export class PointTransform implements PipeTransform {
  transform(point: Point, prefix: string, suffix: string): string {
    return point? `${prefix} [${point.x}, ${point.y}]`: ''
  }
}
