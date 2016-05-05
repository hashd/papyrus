import { ElementRef } from 'angular2/core'
import { Point } from '../geometry/cartesian_system'
import { CommandType } from '..//enums/command_types'
import {DrawContext} from '..//geometry/draw_context';

export class Command {
  type: CommandType
  shortcutKey: string
  initEvent: string = 'mousedown'
  modifyEvent: string = 'mousemove'
  endEvent: string = 'mouseup'

  name: string = 'unnamed'

  validate(data: {}): boolean {
    return true
  }
  
  getSummary(data: {}): string {
    return 'This method has not been overriden and should be done for all commands'
  }
}
