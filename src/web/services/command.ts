import { Injectable } from 'angular2/core'
import { COMMAND_TYPES, CommandType } from '../../dsl/core/command_types'
import { COMMANDS } from '../../dsl/core/commands/all'
import { Command } from '../../dsl/core/command'

@Injectable()
export class CommandService {
  private commands = COMMANDS

  constructor() {
  }

  getCommandTypes(): CommandType[] {
    let commandTypes: CommandType[] = []
    for (const type in COMMAND_TYPES) {
      commandTypes.push(type)
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
