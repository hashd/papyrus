import { ElementRef } from 'angular2/core'
import { Visualizable, AppendableViz } from '../interfaces/visualization'
import { SVG } from '../helpers/svg'

export class Line implements Visualizable {
  parent: AppendableViz
  element: ElementRef
  
  draw({x1, y1, x2, y2}) {
    let line = SVG.createLine(x1, y1, x2, y2)
    this.parent.append(element)
  }
  
  move(x, y) {
    
  }
  
  scale(xRatio, yRatio) {
    
  }
  
  rotate(angle) {
    
  }
}
