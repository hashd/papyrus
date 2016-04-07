import { Component, Input, Output, EventEmitter } from 'angular2/core'
import { Command } from '../../interfaces/command'
import { CommandType, COMMAND_TYPES } from '../../interfaces/enums/command_types'

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
          <span>{{cmd?.constructor?.name}}</span>
          <span>{{cmd.actionKey}}</span>
        </div>
      </div>
    </div>
  `
})
export class CommandBar {
  @Input() commands:       Command[]
  commandTypes:            CommandType[]
  @Input() currentCommand: Command
  @Output() commandChangeEmitter: EventEmitter<any> = new EventEmitter()
  
  constructor() {
    this.commandTypes = COMMAND_TYPES
  }
  
  getCommandsByType(type: CommandType): Command[] {
    return this.commands.filter(cmd => cmd.type === type)
  }
  
  selectCommand(cmd: Command) {
    const previousCommand = this.currentCommand
    
    this.currentCommand = cmd
    this.commandChangeEmitter.emit({
      activeCommand: cmd,
      previousCommand
    })
  }
}
