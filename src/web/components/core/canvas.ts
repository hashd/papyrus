import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core'
import { Command } from '../../../dsl/core/command'
import { CompositePicture } from '../../../dsl/core/commands/composite/picture'
import { Step } from '../../../dsl/core/step'
import { Block } from '../../../dsl/core/block'
import { COMMAND_TYPES } from '../../../dsl/core/command_types'
// import { StepSummary } from '../core/step_summary'
import { VisualizationCanvas } from '../core/visualization_canvas'
import { CommandBar } from '../core/command_bar'
import { PictureContext } from '../../../dsl/geometry/picture_context'
import { Messages, subjects } from '../../../web/services/messages'
import { PictureCommand } from '../../../dsl/core/commands/picture'

// <pa-step-summary [step]="currentStep || previousStep"></pa-step-summary>

@Component({
  selector: 'pa-canvas',
  template: `
    <div (keydown)="activateCommand($event)" tabindex="1" autofocus>
      <div class="left-canvas col">
        <pa-vis-canvas [visualization]="visualization" [element]="currentElement" (mouse)="selectedCommand?handleMouseEvent($event):undefined">
        </pa-vis-canvas>
      </div>
      <div class="right-canvas col">
        <pa-command-bar [commands]="commands" [currentCommand]="selectedCommand" (select)="changeCommand($event)"></pa-command-bar>
      </div>
    </div>
  `,
  directives: [VisualizationCanvas, CommandBar]
})
export class PapyrusCanvas implements OnChanges {
  @Input() commands: Command<any>[]
  @Input() visualization: CompositePicture
  @Input() currentStep: Step<any>

  selectedCommand: Command<any>
  selectedBlock: Block<any>
  previousStep: Step<any> = null
  currentCommandObj = null

  pictureContext: PictureContext
  currentElement: Element = null

  @Output() steps: EventEmitter<Step<any>> = new EventEmitter()

  constructor() {
    // broadcast block selection change message
    const selectedBlockSubject = subjects[Messages.CHANGE_BLOCK_SELECTION]
    selectedBlockSubject.subscribe({
      next: (block: Block<any>) => {
        this.selectBlock(block)
      }
    })
  }

  activateCommand(e) {
    const keyCode = e.keyCode
    let selectedCommand: Command<any>

    if (keyCode >= 65 && keyCode <= 90) {
      selectedCommand = this.commands.filter(cmd => cmd.shortcutKey.charCodeAt(0) - 32 === keyCode)[0]
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
      const steps = this.visualization.block.steps
      this.resetUserActions()
      if (steps.length > 0) {
        this.previousStep = steps[steps.length - 1]
      }

      this.selectBlock(this.visualization.block)
    }
  }

  private selectBlock(block: Block<any>) {
    this.selectedBlock = block
  }

  private handleMouseEvent(e) {
    // TODO: Update logic to create steps and update visualization/picture instance
    const command = this.selectedCommand

    switch (command.type) {
      case COMMAND_TYPES.PRIMITIVE:
      case COMMAND_TYPES.COMPOSITE:
        this.handlePictureCommand(command, e)
        break
      case COMMAND_TYPES.FLOW:
        this.handleFlowCommand(command, e)
        break
      default:
        // no logic
    }
  }

  private handlePictureCommand(command, e) {
    if ('mousedown' === e.type) {
      this.pictureContext = new PictureContext({x: e.x, y: e.y}, {x: e.x, y: e.y})
      this.currentCommandObj = command.type === COMMAND_TYPES.COMPOSITE ? command : new command(this.pictureContext)
    } else if (this.pictureContext && 'mousemove' === e.type) {
      this.pictureContext.end.x = e.x
      this.pictureContext.end.y = e.y

      if (!this.currentStep) {
        this.currentStep = new Step(this.currentCommandObj, this.currentCommandObj.convertContext(this.pictureContext))
      }

      this.currentElement = this.currentCommandObj.execute(this.pictureContext)
    } else if (this.pictureContext && ('mouseout' === e.type || 'mouseup' === e.type)) {
      this.pictureContext.end.x = e.x
      this.pictureContext.end.y = e.y
      if ((this.pictureContext.end.x !== this.pictureContext.start.x || this.pictureContext.end.y !== this.pictureContext.start.y) && this.selectedBlock) {
        this.selectedBlock.add(this.currentStep)
      }

      this.resetUserActions()
    }
  }

  private handleFlowCommand(command: Command, e) {
    if ('dblclick' === e.type && this.selectedBlock) {
      this.pictureContext = new PictureContext({x: e.x, y: e.y}, {x: e.x, y: e.y})
      this.currentCommandObj = new command(this.pictureContext)
      if (this.selectedBlock) {
        this.selectedBlock.add(new Step(this.currentCommandObj, this.pictureContext))
      }

      this.resetUserActions()
    }
  }

  private resetUserActions() {
    this.pictureContext = null
    this.currentElement = null
    this.previousStep = this.currentStep
    this.currentStep = null
    this.currentCommandObj = null
  }
}
