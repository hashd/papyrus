import { CommandType } from './enums/command_types'

export interface CommandInterface {
  onClick()
  onDrag()  
}

export class Command implements CommandInterface {
  static type: CommandType
  static actionKey: string
  static initEvent: string
  static modifyEvent: string
  static endEvent: string
  
  onClick() {
    console.error('This method needs to be implemented by host command')
  }
  
  onDrag() {
    console.error('This method needs to be implemented by host command')
  }
}
