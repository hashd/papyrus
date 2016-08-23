import { Point } from '../../geometry/cartesian_system'

const ns: string = 'http://www.w3.org/2000/svg'

export class SVG {
  static ns: string = ns

  static createSVG(height: number, width: number, viewBox: string) {
    let svg = document.createElementNS(ns, 'svg')
    if (viewBox) svg.setAttributeNS(null, 'viewBox', viewBox)
    if (width) svg.setAttributeNS(null, 'width', width.toString())
    if (height) svg.setAttributeNS(null, 'height', height.toString())

    return svg
  }

  static createGroup(elements: Element[]) {
    let group = document.createElementNS(ns, 'g')
    elements.forEach(element => group.appendChild(element))
    return group
  }

  static createLine(x1: number, y1: number, x2: number, y2: number, magnets: Point[] = []) {
    let line = document.createElementNS(ns, 'line')

    line.setAttributeNS(null, 'x1', x1.toString())
    line.setAttributeNS(null, 'y1', y1.toString())
    line.setAttributeNS(null, 'x2', x2.toString())
    line.setAttributeNS(null, 'y2', y2.toString())

    line.setAttributeNS(null, 'stroke', '#555')
    line.setAttributeNS(null, 'stroke-width', '1')
    line.setAttributeNS(null, 'vector-effect', 'non-scaling-stroke')

    return magnets.length > 0 ? SVG.createGroup([line, ...SVG.createMagnets(magnets)]) : SVG.createGroup([line])
  }

  static createEllipse(cx: number, cy: number, rx: number, ry: number, createMagnets: boolean = false) {
    let ellipse = document.createElementNS(ns, 'ellipse')
    ellipse.setAttributeNS(null, 'cx', cx.toString())
    ellipse.setAttributeNS(null, 'cy', cy.toString())
    ellipse.setAttributeNS(null, 'rx', rx.toString())
    ellipse.setAttributeNS(null, 'ry', ry.toString())

    ellipse.setAttributeNS(null, 'stroke', '#555')
    ellipse.setAttributeNS(null, 'stroke-width', '1')
    ellipse.setAttributeNS(null, 'fill', 'transparent')
    ellipse.setAttributeNS(null, 'vector-effect', 'non-scaling-stroke')

    return ellipse
  }

  private static createMagnets(magnets: Point[]): Element[] {
    return magnets.reduce((acc, cur) => acc.concat(SVG.createEllipse(cur.x, cur.y, 5, 5)), [])
  }
}
