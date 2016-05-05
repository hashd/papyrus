import { ElementRef } from 'angular2/core'
import { Visualizable, AppendableViz } from '../../../../src/gfx/visualization'
import { SVG } from '../../../../src/core/helpers/svg'
import { PictureCommand } from '../../../../src/core/command'
import { CommandType } from '../../../../src/enums/command_types'

export class LineElement implements Visualizable {
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

export class Line extends PictureCommand {
  static type: CommandType = CommandType.PRIMITIVE
  static actionKey: string = 'l'
  
  name: string = 'line'
  
  constructor(parent: ElementRef) {
    super(parent)
  }
  
  draw() {
    let { x: x1, y: y1 } = this.startCoordinates,
        { x: x2, y: y2 } = this.endCoordinates
    
    if (!this.element) {
      this.element = SVG.createLine(x1, y1, x2, y2)
      this.element.setAttributeNS(null, 'stroke', '#555')
      this.parent.nativeElement.appendChild(this.element)
    } else {
      this.element.setAttributeNS(null, 'x2', x2.toString())
      this.element.setAttributeNS(null, 'y2', y2.toString())
    }
  }
}
