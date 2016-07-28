import { Component, Input, Output, EventEmitter } from 'angular2/core'
import { PanelComponent as Panel } from '../generic/panel'
import { StepSummary } from './step_summary'
import { Step } from 'src/dvu/core/step'
import { Messages, Subjects } from 'src/web/services/messages'

@Component({
  selector: 'pa-steps',
  template: `
    <pa-panel header="Steps">
      <ul class="steps" *ngIf="steps?.length">
        <li
          class="step"
          [class.selected]="step === currentStep"
          *ngFor="#step of steps; #i=index;"
          (click)="clickEvent(step)"
        >
          <pa-step-summary [step]="step"></pa-step-summary>
          <div class="remove-icon" (click)="removeStep(step)">
            <i class="fa fa-times" aria-hidden="true"></i>
          </div>
        </li>
      </ul>
      <div *ngIf="!steps?.length" class="step-note">Oops!, nothing here yet. Select a command and get started.</div>
    </pa-panel>
  `,
  directives: [Panel, StepSummary]
})
export class PapyrusSteps implements OnChanges {
  @Input()
  steps: Step[] = []

  currentStep: Step

  @Output() selectedStep: EventEmitter<any> = new EventEmitter()
  @Output() removedStep: EventEmitter<any> = new EventEmitter()

  constructor () {
    const selectedElementSubject = Subjects[Messages.CHANGE_ELEMENT_SELECTION];

    selectedElementSubject.subscribe({
      next: (step) => {
        this.selectStep(step)
      }
    });
  }

  clickEvent(step: Step) {
    this.selectStep(step)

    //broadcast step selection change message
    const selectedStepSubject = Subjects[Messages.CHANGE_STEP_SELECTION]
    selectedStepSubject.next(step)
  }

  selectStep(step: Step) {
    this.currentStep = step
    this.selectedStep.emit({ step })
  }

  removeStep(step: Step) {
    this.removedStep.emit({ step })
  }
}
