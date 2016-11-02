import { Injectable } from '@angular/core'
import { CommandType } from '../../dsl/core/command_types'
import { COMMANDS } from '../../dsl/core/commands/all'
import { Command } from '../../dsl/core/command'

const COMMAND_TYPES: CommandType[] = ['PRIMITIVE', 'ADJUST', 'COMPOSITE']

@Injectable()
export class CommandService {
  private commands: (Function | Command<any>)[] = COMMANDS

  constructor() {
  }

  getCommandTypes(): CommandType[] {
    return COMMAND_TYPES
  }

  getCommands() {
    return this.commands
  }

  addCommand(command: Command<any>) {
    this.commands.push(command)
  }
}
