import { Injectable } from '@angular/core'
import { COMMAND_TYPES, CommandType } from '../../dsl/core/command_types'
import { COMMANDS } from '../../dsl/core/commands/all'
import { Command } from '../../dsl/core/command'

@Injectable()
export class CommandService {
  private commands: (Function | Command<any>)[] = COMMANDS

  constructor() {
  }

  getCommandTypes(): CommandType[] {
    let commandTypes: CommandType[] = []
    for (const type in COMMAND_TYPES) {
      if (COMMAND_TYPES.hasOwnProperty(type)) {
        commandTypes.push(type)
      }
    }

    return commandTypes
  }

  getCommands() {
    return this.commands
  }

  addCommand(command: Command<any>) {
    this.commands.push(command)
  }
}
