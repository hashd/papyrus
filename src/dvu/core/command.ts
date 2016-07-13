import { Point } from '../geometry/cartesian_system'
import { CommandType } from '../enums/command_types'
import { Scope } from './scope'

export interface Executable {
  execute(data, scope: Scope)
}

export class Command implements Executable {
  type: CommandType
  shortcutKey: string
  initEvent: string = 'mousedown'
  modifyEvent: string = 'mousemove'
  endEvent: string = 'mouseup'

  name: string = 'unnamed'

  validate(data: {}): boolean {
    return true
  }

  execute(data, scope: Scope = new Scope()) {

  }
  
  getSummary(data: {}): string {
    return 'This method has not been overriden and should be done for all commands'
  }
}
