import { Component, Input, Output, EventEmitter } from 'angular2/core'
import { PanelComponent as Panel } from '../generic/panel'
import { StepSummary } from './step_summary'
import { Step } from '../../models/step'

@Component({
  selector: 'pa-steps',
  template: `
    <pa-panel header="Steps">
      <ul class="steps">
        <li *ngFor="#step of steps; #i=index" (click)="selectStep(i)">
          <pa-step-summary [step]="step"></pa-step-summary>
        </li>
      </ul>
    </pa-panel>
  `,
  directives: [Panel, StepSummary]
})
export class PapyrusSteps {
  @Input() steps: Step[] = []
  
  @Output() selectedStep: EventEmitter<any> = new EventEmitter()
  
  selectStep(index: number) {
    this.selectedStep.emit({ index })
  }
}
