import { CommandType } from './command_types'
import { Scope } from './scope'
import { Executable } from './step'

export class Command implements Executable {
  type: CommandType
  shortcutKey: string
  initEvent: string = 'mousedown'
  modifyEvent: string = 'mousemove'
  endEvent: string = 'mouseup'

  commandName: string = 'unnamed'

  validate(data: {}): boolean {
    return true
  }

  execute(data, scope: Scope = new Scope()) {

  }

  getSummary(data: {}): string {
    return 'This method has not been overriden and should be done for all commands'
  }
}
