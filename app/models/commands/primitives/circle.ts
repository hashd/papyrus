import { ElementRef } from 'angular2/core'
import { Visualizable, AppendableViz } from '../../../interfaces/visualization'
import { SVG } from '../../../helpers/svg'
import { Command } from '../../../interfaces/command'
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

export class Circle extends Command {
  static type: CommandType = CommandType.PRIMITIVE
  static actionKey: string = 'c'
  static initEvent: string = 'mousedown'
  static modifyEvent: string = 'mousemove'
  static endEvent: string = 'mouseup'
  
  onClick() {
    console.error('Unsupported event by command: Circle')
  }
  
  onDrag() {
    
  }
}
