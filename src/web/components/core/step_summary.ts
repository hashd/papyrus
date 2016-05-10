import { Component, Input } from 'angular2/core'
import { Step } from 'src/core/main/step'

@Component({
  selector: 'pa-step-summary',
  template: `
    <div *ngIf="step" class="step-summary">{{step?.getSummary()}}</div>
    <div *ngIf="!step" class="step-summary">No command selected.</div>
  `
})
export class StepSummary {
  @Input() step: Step
}
