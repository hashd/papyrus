import { Injectable } from 'angular2/core'
import { COMMAND_TYPES, CommandType } from '../../dvu/enums/command_types'
import { COMMANDS } from '../../dvu/core/commands/primitives/all'

@Injectable()
export class CommandService {
   private commands = COMMANDS
   
   constructor() {
   }
   
   getCommandTypes(): CommandType[] {
     return COMMAND_TYPES
   }
   
   getCommands() {
     return this.commands
   }
}
