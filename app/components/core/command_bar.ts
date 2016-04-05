import { Component, Input } from 'angular2/core'
import { Command } from '../../models/command'

@Component({
  selector: 'pa-command-bar',
  template: `
  
  `
})
export class CommandBar {
  @Input()
  commands: Command[]
}