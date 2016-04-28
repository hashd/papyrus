import { Injectable } from 'angular2/core'
import { Command, COMMAND_TYPES, CommandType } from '../models'
import { COMMANDS } from '../models/commands/all'

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
