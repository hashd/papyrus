import { Component, Input, Output, EventEmitter } from 'angular2/core'
import { Command } from '../../../dvu/core/command'
import { CommandType, COMMAND_TYPES } from '../../../dvu/enums/command_types'

@Component({
  selector: 'pa-command-bar',
  template: `
    <div class="command-bar">
      <div class="title">Commands</div>
      <div class="command-set" *ngFor="#commandType of commandTypes">
        <div class="command-entry clearfix" *ngFor="#cmd of getCommandsByType(commandType)"
          [class.selected]="cmd === currentCommand"
          (click)="selectCommand(cmd)"
        >
          <span>{{cmd?.name}}</span>
          <span>{{cmd.shortcutKey}}</span>
        </div>
      </div>
    </div>
  `
})
export class CommandBar {
  @Input() commands: Command[]
  @Input() currentCommand: Command
  
  commandTypes: CommandType[] = COMMAND_TYPES
  
  @Output() select: EventEmitter<any> = new EventEmitter()
  
  getCommandsByType(type: CommandType) {
    return this.commands.filter(cmd => cmd.type === type)
  }
  
  selectCommand(activeCommand: Command) {
    const previousCommand = this.currentCommand
    
    this.currentCommand = activeCommand
    this.select.emit({ activeCommand, previousCommand })
  }
}
