import { Component } from 'angular2/core'
import { Command } from '../../models/command'
import { CompositeVisualization } from '../../models/visualization'
import { Step } from '../../models/step'
import { StepSummary } from '../core/step_summary'
import { VisualizationCanvas } from '../core/visualization_canvas'
import { CommandBar } from '../core/command_bar'

@Component({
  selector: 'pa-canvas',
  template: `
    <div>
      <pa-step-summary [step]="currentStep"></pa-step-summary>
      <pa-vis-canvas [visualization]="visualization"></pa-vis-canvas>
      <pa-command-bar [commands]="commands"></pa-command-bar>
    </div>
  `,
  directives: [StepSummary, VisualizationCanvas, CommandBar]
})
export class PapyrusCanvas {
  commands: Command[] = []
  visualization: CompositeVisualization
  currentStep: Step
  currentCommand: Command

  constructor() {
  
  }
}
