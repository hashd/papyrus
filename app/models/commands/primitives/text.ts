import { ElementRef } from 'angular2/core'
import { Visualizable, AppendableViz } from '../../../../src/gfx/visualization'
import { SVG } from '../../../../src/core/helpers/svg'
import { Command, PictureCommand } from '../../../../src/core/command'
import { CommandType } from '../../../../src/enums/command_types'

export class TextElement implements Visualizable {
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

export class Text extends PictureCommand {
  static type: CommandType = CommandType.PRIMITIVE
  static actionKey: string = 't'
  
  constructor(parent: ElementRef) {
    super(parent)
  }
}
