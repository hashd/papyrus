import { CommandType } from './enums/command_types'

export interface Command {
  type: CommandType
  actionKey: string
  
  onClick()
  onDrag()
}
