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
    return line
  }
  
  static createRect(x: number, y: number, width: number, height: number) {
    let rect = document.createElementNS(ns, 'rect')
    rect.setAttributeNS(null, 'x', x.toString())
    rect.setAttributeNS(null, 'y', y.toString())
    rect.setAttributeNS(null, 'width', width.toString())
    rect.setAttributeNS(null, 'height', height.toString())
    
    return rect
  }
  
  static createEllipse(cx: number, cy: number, rx: number, ry: number) {
    let ellipse = document.createElementNS(ns, 'ellipse')
    ellipse.setAttributeNS(null, 'cx', cx.toString())
    ellipse.setAttributeNS(null, 'cy', cy.toString())
    ellipse.setAttributeNS(null, 'rx', rx.toString())
    ellipse.setAttributeNS(null, 'ry', ry.toString())
    
    return ellipse
  }
}
