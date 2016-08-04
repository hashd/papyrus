import {Point} from '../../geometry/cartesian_system'
import {Dimensions} from '../../geometry/dimensions'
import {PictureContext} from '../../geometry/picture_context'

const ns: string = 'http://www.w3.org/2000/svg'

export class SVG {
  static ns: string = ns

  static createLine(x1: number, y1: number, x2: number, y2: number) {
    let line = document.createElementNS(ns, 'line')
    line.setAttributeNS(null, 'x1', x1.toString())
    line.setAttributeNS(null, 'y1', y1.toString())
    line.setAttributeNS(null, 'x2', x2.toString())
    line.setAttributeNS(null, 'y2', y2.toString())
    line.setAttributeNS(null, 'stroke', '#555')
    line.setAttributeNS(null, 'stroke-width', '1')
    line.setAttributeNS(null, 'vector-effect', 'non-scaling-stroke')

    return line
  }

  static createRect(x: number, y: number, width: number, height: number) {
    let rect = document.createElementNS(ns, 'rect')
    rect.setAttributeNS(null, 'x', x.toString())
    rect.setAttributeNS(null, 'y', y.toString())
    rect.setAttributeNS(null, 'width', width.toString())
    rect.setAttributeNS(null, 'height', height.toString())
    rect.setAttributeNS(null, 'vector-effect', 'non-scaling-stroke')

    return rect
  }

  static createEllipse(cx: number, cy: number, rx: number, ry: number) {
    let ellipse = document.createElementNS(ns, 'ellipse')
    ellipse.setAttributeNS(null, 'cx', cx.toString())
    ellipse.setAttributeNS(null, 'cy', cy.toString())
    ellipse.setAttributeNS(null, 'rx', rx.toString())
    ellipse.setAttributeNS(null, 'ry', ry.toString())
    ellipse.setAttributeNS(null, 'vector-effect', 'non-scaling-stroke')

    return ellipse
  }

  static createGroup(elements: Element[], width: number, height: number) {
    let group = document.createElementNS(ns, 'g')
    group.setAttributeNS(null, 'width', width.toString())
    group.setAttributeNS(null, 'height', height.toString())
    group.setAttributeNS(null, 'vector-effect', 'non-scaling-stroke')

    elements.forEach(element => group.appendChild(element))
    return group
  }

  static createPath(points: Point[]) {
    let path = document.createElementNS(ns, 'path'),
      d = ''
    path.setAttributeNS(null, 'fill', 'none')
    path.setAttributeNS(null, 'stroke', '#555')
    path.setAttributeNS(null, 'stroke-width', '1')
    path.setAttributeNS(null, 'vector-effect', 'non-scaling-stroke')

    // points.forEach(point => d = `${d}`);

    points.forEach(function(point) {
      if(d === '') {
        d += `M${point.x.toString()},${point.y.toString()} `
      } else {
        d += `L${point.x.toString()},${point.y.toString()} `
      }
    })

    path.setAttributeNS(null, 'd', d)
    return path
  }

  static createSVG(elements: Element[], pictureContext: PictureContext, dimensions: Dimensions) {
    let group = document.createElementNS(ns, 'svg')
    group.setAttributeNS(null, 'viewBox', `0 0 ${dimensions.width} ${dimensions.height}`)
    group.setAttributeNS(null, 'width', pictureContext.getWidth().toString())
    group.setAttributeNS(null, 'height', pictureContext.getHeight().toString())
    group.setAttributeNS(null, 'x', pictureContext.start.x.toString())
    group.setAttributeNS(null, 'y', pictureContext.start.y.toString())
    group.setAttributeNS(null, 'preserveAspectRatio', 'xMinYMin meet')

    elements.forEach(element => group.appendChild(element))
    return group
  }
}
