import { Component, Input } from 'angular2/core'
import { Command } from '../../interfaces/command'
import { CompositeVisualization } from '../../models/visualization'
import { Step } from '../../models/step'
import { StepSummary } from '../core/step_summary'
import { VisualizationCanvas } from '../core/visualization_canvas'
import { CommandBar } from '../core/command_bar'

@Component({
  selector: 'pa-canvas',
  template: `
    <div>
      <div class="left-canvas col">
        <pa-step-summary [step]="currentStep"></pa-step-summary>
        <pa-vis-canvas [visualization]="visualization"></pa-vis-canvas>
      </div>
      <div class="right-canvas col">
        <pa-command-bar [commands]="commands"></pa-command-bar>
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
}
