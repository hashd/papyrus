import { Injectable } from 'angular2/core'
import { COMMAND_TYPES, CommandType } from '../../dvu/core/command_types'
import { COMMANDS } from '../../dvu/core/commands/all'
import { Command } from '../../dvu/core/command'

@Injectable()
export class CommandService {
  private commands: Command[] = COMMANDS

  constructor() {
  }

  getCommandTypes(): CommandType[] {
    return COMMAND_TYPES
  }

  getCommands() {
    return this.commands
  }

  addCommand(command: Command) {
    this.commands.push(command)
  }
}
