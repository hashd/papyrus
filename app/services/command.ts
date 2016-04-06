import { Injectable } from 'angular2/core'
import * as _ from 'lodash'
import { COMMAND_TYPES, CommandType } from '../interfaces/enums/command_types'
import { Command } from '../interfaces/command'
import { COMMANDS } from '../models/commands/all'

@Injectable()
export class CommandService {
   public commands: Command[]
   
   constructor() {
     this.loadCommands()
   }
   
   loadCommands() {
     console.log(COMMANDS)
     this.commands = COMMANDS
   }
   
   getCommandTypes(): CommandType[] {
     return COMMAND_TYPES
   }
   
   getCommandsByType(): Command[][] {
     return COMMAND_TYPES.map(type => this.commands.filter(cmd => cmd.type === type))
   }
}
