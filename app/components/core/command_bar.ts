import { Component, Input } from 'angular2/core'
import { Command } from '../../models/command'

@Component({
  selector: 'pa-command-bar',
  template: `
    <div class="command-bar">
      <div class="title">Commands</div>
    </div>
  `
})
export class CommandBar {
  @Input()
  commands: Command[]
}