import { Component, Input, Output, EventEmitter, ElementRef } from 'angular2/core'
import { PanelComponent as Panel } from '../generic/panel'
import { StepSummaryComponent } from '../core/step_summary'
import { CompositePicture } from '../../../dsl/core/commands/composite/picture'

@Component({
  selector: 'pa-steps',
  template: `
    <pa-panel header="Steps">
      <pa-step-summary [visualization]="visualization" [block]="visualization?.block"></pa-step-summary>
      <div *ngIf="!visualization?.getSummary()?.length" class="step-note">Oops!, nothing here yet. Select a command and get started.</div>
    </pa-panel>
  `,
  directives: [Panel, StepSummaryComponent]
})
export class PapyrusSteps {
  @Input() visualization: CompositePicture
}
