import { Component, Input, OnInit } from 'angular2/core'
import { Command } from '../../interfaces/command'
import { CompositeVisualization } from '../../models/visualization'
import { Step } from '../../models/step'
import { StepSummary } from '../core/step_summary'
import { VisualizationCanvas } from '../core/visualization_canvas'
import { CommandBar } from '../core/command_bar'

@Component({
  selector: 'pa-canvas',
  template: `
    <div (keydown)="activateCommand($event)" tabindex="1" autofocus>
      <div class="left-canvas col">
        <pa-step-summary [step]="currentStep"></pa-step-summary>
        <pa-vis-canvas [visualization]="visualization"></pa-vis-canvas>
      </div>
      <div class="right-canvas col">
        <pa-command-bar [commands]="commands" [currentCommand]="currentCommand"></pa-command-bar>
      </div>
    </div>
  `,
  directives: [StepSummary, VisualizationCanvas, CommandBar]
})
export class PapyrusCanvas {
  @Input()
  commands: Command[]
  visualization: CompositeVisualization
  currentStep: Step
  currentCommand: Command

  constructor() {
  
  }
  
  activateCommand(e) {
    const keyCode = e.keyCode
    let selectedCommand: Command
    
    if (keyCode >= 65 && keyCode <= 90) {
      selectedCommand = this.commands.find(cmd => cmd.actionKey.charCodeAt(0) - 32 === keyCode)
    }
    
    if (selectedCommand !== undefined) {
      this.currentCommand = selectedCommand
    }
  }
}
