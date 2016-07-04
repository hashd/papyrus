import { Component, Input, Output, EventEmitter, OnChanges } from 'angular2/core'
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
export class PapyrusCanvas implements OnChanges {
  @Input() commands: Command[]
  @Input() visualization: CompositeVisualization
  @Input() currentStep: Step

  selectedCommand: Command
  previousStep: Step = null
  currentStep: Step = null

  pictureContext: PictureContext
  currentElement: Element = null

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

  ngOnChanges(changes) {
    if (changes.hasOwnProperty('visualization') && this.visualization) {
      this.resetUserActions()
      if (this.visualization.steps.length !== 0) {
        this.previousStep = this.visualization.steps[this.visualization.steps.length - 1]
      }
    }
  }

  private handleMouseEvent(e) {
    // TODO: Update logic to create steps and update visualization/picture instance
    const command = this.selectedCommand
    if (command instanceof PictureCommand) {
      this.handlePictureCommand(command, e)
    }
  }

  private handlePictureCommand(command: PictureCommand, e) {
    if ('mousedown' === e.type) {
      this.pictureContext = new PictureContext({x: e.x, y: e.y}, {x: e.x, y: e.y})
    } else if (this.pictureContext && 'mousemove' === e.type) {

      //Needs to remove command name dependancy
      if(command.name === 'Path') {
        this.pictureContext.addPoint({x: e.x, y: e.y})
      } else {
        this.pictureContext.end.x = e.x
        this.pictureContext.end.y = e.y
      }

      // If element has not already been drawn, draw else redraw (avoid creating new elements)
      if (!this.currentStep) {
        this.currentElement = command.execute(this.pictureContext).element
        this.currentStep = new Step(command, this.pictureContext)
      } else {
        command.redraw(this.currentElement, this.pictureContext)
      }
    } else if (this.pictureContext && ('mouseout' === e.type || 'mouseup' === e.type)) {
      this.pictureContext.end.x = e.x
      this.pictureContext.end.y = e.y
      if (this.pictureContext.end.x !== this.pictureContext.start.x || this.pictureContext.end.y !== this.pictureContext.start.y) {
        this.visualization.steps.push(new Step(command, this.pictureContext))
      }

      this.resetUserActions()
    }
  }

  private resetUserActions() {
    this.pictureContext = null
    this.currentElement = null
    this.previousStep = this.currentStep
    this.currentStep = null
  }
}
