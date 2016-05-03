import { ElementRef } from 'angular2/core'
import { Visualizable, AppendableViz } from '../../../interfaces/visualization'
import { SVG } from '../../../helpers/svg'
import { DrawCommand } from '../../../interfaces/command'
import { CommandType } from '../../../interfaces/enums/command_types'

export class RectElement implements Visualizable {
  parent: AppendableViz
  element: ElementRef
  
  draw({x1, y1, x2, y2}) {
    let line = SVG.createLine(x1, y1, x2, y2)
    this.parent.append(line)
  }
  
  move(x, y) {
    
  }
  
  scale(xRatio, yRatio) {
    
  }
  
  rotate(angle) {
    
  }
}

export class Rect extends DrawCommand {
  static type: CommandType = CommandType.PRIMITIVE
  static actionKey: string = 'x'
  
  name: string = 'rectangle'
  
  constructor(parent: ElementRef) {
    super(parent)
  }
  
  draw() {
    let { x: x1, y: y1 } = this.startCoordinates,
        { x: x2, y: y2 } = this.endCoordinates
    
    console.log(x1, y1, x2, y2, Math.min(x1, x2), Math.min(y1, y2))
    if (!this.element) {
      this.element = SVG.createRect(Math.min(x1, x2), Math.min(y1, y2), Math.abs(x2 - x1), Math.abs(y2 - y1))
      this.element.setAttributeNS(null, 'stroke', '#555')
      this.element.setAttributeNS(null, 'fill', 'transparent')
      this.parent.nativeElement.appendChild(this.element)
    } else {
      this.element.setAttributeNS(null, 'x', Math.min(x1, x2).toString())
      this.element.setAttributeNS(null, 'y', Math.min(y1, y2).toString())
      this.element.setAttributeNS(null, 'width', Math.abs(x2 - x1).toString())
      this.element.setAttributeNS(null, 'height', Math.abs(y2 - y1).toString())
    }
  }
}
