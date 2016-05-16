import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from 'angular2/core'
import { Command } from '../../../dvu/core/command'
import { CompositeVisualization } from '../../../dvu/gfx/visualization'
import { Step } from '../../../dvu/core/step'
import { StepSummary } from '../core/step_summary'
import { VisualizationCanvas } from '../core/visualization_canvas'
import { CommandBar } from '../core/command_bar'
import {PictureCommand} from 'src/dvu/core/commands/picture'
import {PictureContext} from 'src/dvu/geometry/picture_context'

@Component({
  selector: 'pa-canvas',
  template: `
    <div (keydown)="activateCommand($event)" tabindex="1" autofocus>
      <div class="left-canvas col">
        <pa-step-summary [step]="currentStep || previousStep"></pa-step-summary>
        <pa-vis-canvas [visualization]="visualization" [element]="currentElement" (mouse)="selectedCommand?handleMouseEvent($event):undefined">
        </pa-vis-canvas>
      </div>
      <div class="right-canvas col">
        <pa-command-bar [commands]="commands" [currentCommand]="selectedCommand" (select)="changeCommand($event)"></pa-command-bar>
      </div>
    </div>
  `,
  directives: [StepSummary, VisualizationCanvas, CommandBar]
})
export class PapyrusCanvas {
  @Input() commands: Command[]
  @Input() visualization: CompositeVisualization
  @Input() currentStep: Step

  currentCommand: Command
  selectedCommand: Command
  previousStep: Step

  pictureContext: PictureContext
  currentElement: Element

  @Output() steps: EventEmitter<Step> = new EventEmitter()

  constructor() {
  
  }
  
  activateCommand(e) {
    const keyCode = e.keyCode
    let selectedCommand: Command
    
    if (keyCode >= 65 && keyCode <= 90) {
      selectedCommand = this.commands.find(cmd => cmd.shortcutKey.charCodeAt(0) - 32 === keyCode)
    }
    
    if (selectedCommand !== undefined) {
      this.selectedCommand = selectedCommand
    }
  }
  
  changeCommand(e) {
    this.selectedCommand = e.activeCommand
  }
  
  private handleMouseEvent(e) {
    // TODO: Update logic to create steps and update visualization/picture instance
    const command = this.selectedCommand
    if (command instanceof PictureCommand) {
      this.handlePictureCommand(command, e)
    }
  }

  private handlePictureCommand(command: PictureCommand, e) {
    if (command.initEvent === e.type) {
      this.pictureContext = new PictureContext({x: e.x, y: e.y}, {x: e.x, y: e.y})
      this.currentElement = command.execute(this.pictureContext).element
    } else if (this.pictureContext && command.modifyEvent === e.type) {
      this.pictureContext.end.x = e.x
      this.pictureContext.end.y = e.y
      this.currentElement = command.execute(this.pictureContext).element
    } else if (this.pictureContext && command.endEvent === e.type) {
      this.pictureContext.end.x = e.x
      this.pictureContext.end.y = e.y
      this.currentElement = null
    }
  }
}
