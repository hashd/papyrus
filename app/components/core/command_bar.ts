import { Component, Input, AfterViewInit } from 'angular2/core'
import { Command } from '../../interfaces/command'
import { CommandType, COMMAND_TYPES } from '../../interfaces/enums/command_types'

@Component({
  selector: 'pa-command-bar',
  template: `
    <div class="command-bar">
      <div class="title">Commands</div>
      <div *ngFor="#commandType of commandTypes">
        <div>{{commandType}}</div>
        <div>
          <div *ngFor="#cmd of getCommandsByType(commandType)">
            <span>{{cmd?.constructor?.name}}</span>
            <span>{{cmd.actionKey}}</span>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CommandBar implements AfterViewInit {
  @Input()
  commands: Command[]
  commandTypes: CommandType[]
  
  constructor() {
    this.commandTypes = COMMAND_TYPES
  }
  
  getCommandsByType(type: CommandType): Command[] {
    return this.commands.filter(cmd => cmd.type === type)
  }
}
