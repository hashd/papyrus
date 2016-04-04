let ns: string = 'http://www.w3.org/2000/svg'

export class SVG {
  static ns: string = ns
  
  static createLine(x1: number, y1: number, x2: number, y2: number) {
    let line = document.createElementNS(ns, 'line')
    line.setAttributeNS(null, 'x1', x1.toString())
    line.setAttributeNS(null, 'y1', y1.toString())
    line.setAttributeNS(null, 'x2', x2.toString())
    line.setAttributeNS(null, 'y2', y2.toString())
    
    return line
  }
}
