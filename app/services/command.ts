import { Injectable } from 'angular2/core'
import { Command, COMMAND_TYPES, CommandType } from '../models'
import { COMMANDS } from '../models/commands/all'

@Injectable()
export class CommandService {
   public commands: Command[]
   
   constructor() {
     this.commands = COMMANDS
   }
   
   getCommandTypes(): CommandType[] {
     return COMMAND_TYPES
   }
   
   getCommands(): Command[] {
     return this.commands
   }
}
