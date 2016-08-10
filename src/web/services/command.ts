import { Injectable } from 'angular2/core'
import { COMMAND_TYPES, CommandType } from '../../dvu/core/command_types'
import { COMMANDS } from '../../dvu/core/commands/all'
import { Command } from '../../dvu/core/command'

@Injectable()
export class CommandService {
  private commands = COMMANDS

  constructor() {
  }

  getCommandTypes(): CommandType[] {
    let commandTypes: CommandType[] = []
    for (const type in COMMAND_TYPES) {
      if (!isFinite(type)) {
        commandTypes.push(type)
      }
    }

    return commandTypes
  }

  getCommands() {
    return this.commands
  }

  addCommand(command: Command) {
    this.commands.push(command)
  }
}
