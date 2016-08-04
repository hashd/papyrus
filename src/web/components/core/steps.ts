import { Component, Input, Output, EventEmitter, ElementRef } from 'angular2/core'
import { PanelComponent as Panel } from '../generic/panel'
import { StepSummary } from './step_summary'
import { Step } from 'src/dvu/core/step'
import { PictureContext } from 'src/dvu/geometry/picture_context'
import { Messages, Subjects } from 'src/web/services/messages'

@Component({
  selector: 'pa-steps',
  template: `
    <pa-panel header="Steps">
      <ul class="steps" *ngIf="visualization?.block?.steps?.length">
        <li
          class="step"
          [class.selected]="step === currentStep"
          *ngFor="#step of visualization?.block?.steps; #i=index;"
          (click)="clickEvent(step)"
        >
          <svg class="step-preview" xmlns="http://www.w3.org/2000/svg"
            version="1.1" width="60px" height="60px"
            preserveAspectRatio="xMidYMid slice" #stepPreview>
          </svg>
          {{ drawStepPreview(stepPreview, i+1) }} <!-- added to append step preview element-->
          <pa-step-summary [step]="step"></pa-step-summary>
          <div class="remove-icon" (click)="removeStep(step)">
            <i class="fa fa-times-circle" aria-hidden="true"></i>
          </div>
        </li>
      </ul>
      <div *ngIf="!visualization?.block?.steps?.length" class="step-note">Oops!, nothing here yet. Select a command and get started.</div>
    </pa-panel>
  `,
  directives: [Panel, StepSummary]
})
export class PapyrusSteps {
  @Input()
  visualization: CompositeVisualization

  currentStep: Step

  @Output() selectedStep: EventEmitter<any> = new EventEmitter()
  @Output() removedStep: EventEmitter<any> = new EventEmitter()

  constructor () {
    const selectedElementSubject = Subjects[Messages.CHANGE_ELEMENT_SELECTION]

    selectedElementSubject.subscribe({
      next: (step) => {
        this.selectStep(step)
      }
    })
  }

  clickEvent(step: Step) {
    this.selectStep(step)

    //broadcast step selection change message
    const selectedStepSubject = Subjects[Messages.CHANGE_STEP_SELECTION]
    selectedStepSubject.next(step.uuid)
  }

  selectStep(step: Step) {
    this.currentStep = step
    this.selectedStep.emit({ step })
  }

  removeStep(step: Step) {
    this.removedStep.emit({ step })
  }

  drawStepPreview(preview: ElementRef, count: number) {
    const width = this.visualization.dimensions.width || preview.clientWidth,
      height = this.visualization.dimensions.height || preview.clientHeight,
      pictureContext = new PictureContext({ x: 0, y: 0 }, { x: width,y: height })

    preview.setAttribute('viewBox', `0 0 ${width} ${height}`)
    preview.innerHTML = this.visualization.executeUntil(count, pictureContext).element.outerHTML
  }
}
