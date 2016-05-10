import { Component, Input, Output, EventEmitter } from 'angular2/core'
import { Command } from 'src/core/main/command'
import { CompositeVisualization } from 'src/core/gfx/visualization'
import { Step } from 'src/core/main/step'
import { StepSummary } from '../core/step_summary'
import { VisualizationCanvas } from '../core/visualization_canvas'
import { CommandBar } from '../core/command_bar'

@Component({
  selector: 'pa-canvas',
  template: `
    <div (keydown)="activateCommand($event)" tabindex="1" autofocus>
      <div class="left-canvas col">
        <pa-step-summary [step]="currentStep || previousStep"></pa-step-summary>
        <pa-vis-canvas [visualization]="visualization" (mouse)="handleMouseEvent($event)"></pa-vis-canvas>
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
  
  previousStep: Step
  currentCommand: Command
  
  selectedCommand: Command
  
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
  
  handleMouseEvent(e) {
    // TODO: Update logic to create steps and update visualization/picture instance

    /*if (this.selectedCommand) {
      if (this.selectedCommand.initEvent === e.type) {
        this.currentStep = new Step(this.selectedCommand, e)
      } else if (this.currentStep && this.selectedCommand.modifyEvent === e.type && this.currentStep) {
        this.currentStep.modify(e)
      } else if (this.currentStep && this.selectedCommand.endEvent === e.type) {
        if (this.currentStep.validate()) {
          this.currentStep.end()
          this.visualization.steps.push(this.currentStep)
          
          this.previousStep = this.currentStep
          this.steps.emit(this.currentStep)
        }
        
        this.currentStep = undefined
      }
    }*/
  }
}
