import { ElementRef } from 'angular2/core'
import { Visualizable, AppendableViz } from '../../../interfaces/visualization'
import { SVG } from '../../../helpers/svg'
import { Command, DrawCommand } from '../../../interfaces/command'
import { CommandType } from '../../../interfaces/enums/command_types'

export class CircleElement implements Visualizable {
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

export class Circle extends DrawCommand {
  static type: CommandType = CommandType.PRIMITIVE
  static actionKey: string = 'c'
  
  name: string = 'circle'
  
  constructor(parent: ElementRef) {
    super(parent)
  }
  
  draw() {
    let { x: x1, y: y1 } = this.startCoordinates,
        { x: x2, y: y2 } = this.endCoordinates
        
    if (!this.element) {
      this.element = SVG.createEllipse(x1, y1, Math.abs(x2 - x1), Math.abs(y2 - y1))
      this.element.setAttributeNS(null, 'stroke', '#555')
      this.element.setAttributeNS(null, 'fill', 'transparent')
      this.parent.nativeElement.appendChild(this.element)
    } else {
      this.element.setAttributeNS(null, 'rx', Math.abs(x2 - x1).toString())
      this.element.setAttributeNS(null, 'ry', Math.abs(y2 - y1).toString())
    }
  }
}
