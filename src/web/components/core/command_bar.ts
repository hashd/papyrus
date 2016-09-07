import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Command } from '../../../dsl/core/command'
import { CommandType, COMMAND_TYPES } from '../../../dsl/core/command_types'
import { CommandService } from '../../services/command'

@Component({
  selector: 'pa-command-bar',
  template: `
    <div class="command-bar">
      <div class="command-set" *ngFor="let commandType of commandTypes">
        <div class="title">{{commandType}}</div>
        <div class="command-entry clearfix" *ngFor="let cmd of getCommandsByType(commandType)"
          [class.selected]="cmd === currentCommand"
          (click)="selectCommand(cmd)"
        >
          <span class="name">{{cmd?.commandName}}</span>
          <span class="key">{{cmd?.shortcutKey}}</span>
        </div>
      </div>
    </div>
  `,
  providers: [CommandService]
})
export class CommandBar {
  @Input() commands: Command<any>[]
  @Input() currentCommand: Command<any>

  commandTypes: CommandType[] = []

  @Output() select: EventEmitter<any> = new EventEmitter()

  constructor(private commandService: CommandService) {
    this.commandTypes = commandService.getCommandTypes()
  }

  getCommandsByType(type: CommandType) {
    return this.commands.filter(cmd => cmd.type === COMMAND_TYPES[type] && cmd.name !== 'unnamed')
  }

  refreshCommands() {
    this.commands = this.commandService.getCommands()
  }

  selectCommand(activeCommand: Command<any>) {
    const previousCommand = this.currentCommand

    this.currentCommand = activeCommand
    this.select.emit({ activeCommand, previousCommand })
  }
}
