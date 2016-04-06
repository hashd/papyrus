import { Injectable } from 'angular2/core'
import * as _ from 'lodash'
import { COMMAND_TYPES, CommandType } from '../interfaces/enums/command_types'
import { Command } from '../interfaces/command'
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
