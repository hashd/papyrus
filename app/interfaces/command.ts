import { CommandType } from './enums/command_types'

export interface CommandInterface {
  onClick()
  onDrag()  
}

export class Command implements CommandInterface {
  type: CommandType
  
  constructor(public actionKey: string) {
  }
  
  onClick() {
    console.error('This method needs to be implemented by host command')
  }
  
  onDrag() {
    console.error('This method needs to be implemented by host command')
  }
}
