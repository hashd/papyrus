import { PipeTransform, Pipe } from '@angular/core'
import { Point } from '../../dsl/geometry/cartesian_system'

@Pipe({
  name: 'point'
})
export class PointTransform implements PipeTransform {
  transform(point: Point, prefix, suffix): string {
    return point ? `${prefix} [${point.x}, ${point.y}]` : ''
  }
}
