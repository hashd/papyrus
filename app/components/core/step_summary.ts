import { Component, Input } from 'angular2/core'
import { Step } from '../../models/step'

@Component({
  selector: 'pa-step-summary',
  template: `
    <div class="step-summary">{{step | json}}</div>
  `
})
export class StepSummary {
  @Input() step: Step
}