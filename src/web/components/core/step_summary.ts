import { Component, Input, Output, EventEmitter, ElementRef } from 'angular2/core'
import { Step, Executable } from '../../../dvu/core/step'
import { Block } from '../../../dvu/core/block'
import { StepSummary } from '../../../dvu/core/step_summary'
import { COMMAND_TYPES } from '../../../dvu/core/command_types'
import { PictureContext } from '../../../dvu/geometry/picture_context'
import { convertObjectModel, AdapterTypes } from '../../../dvu/adapters/adapter'
import { Messages, subjects } from '../../../web/services/messages'

@Component({
  selector: 'pa-step-summary',
  template: `
    <ul class="steps">
      <li
        class="step"
        [class.selected]="stepSummary.step === currentStep"
        *ngFor="#stepSummary of block?.getSummary(); #i=index;"
        (click)="clickEvent(stepSummary)"
      >
        <div class="step-content">
          <div *ngIf="hasPreview(stepSummary.step)">
            <div class="step-preview" #stepPreview></div>
            {{ drawStepPreview(stepPreview, i+1) }} <!-- added to append step preview element-->
          </div>
          <div class="step-summary">
            <span class="summary">{{stepSummary.summary}}</span>
          </div>
          <div class="remove-icon" (click)="removeStep(stepSummary.step)">
            <i class="fa fa-times-circle" aria-hidden="true"></i>
          </div>
        </div>
        <pa-step-summary *ngIf="isBlock(stepSummary.step)"  [visualization]="visualization" [block]="stepSummary.step"></pa-step-summary>
      </li>
    </ul>
  `,
  directives: [ StepSummaryComponent ]
})
export class StepSummaryComponent {
  @Input() block: Block
  @Input() visualization: CompositeVisualization

  currentStep: Step

  @Output() selectedStep: EventEmitter<any> = new EventEmitter()
  @Output() removedStep: EventEmitter<any> = new EventEmitter()

  constructor () {
    const selectedElementSubject = subjects[Messages.CHANGE_ELEMENT_SELECTION]

    selectedElementSubject.subscribe({
      next: (step) => {
        this.selectStep(step)
      }
    })
  }

  clickEvent(stepSummary: StepSummary) {
    if (stepSummary.step instanceof Step) {
      this.selectStep(stepSummary.step)

      // broadcast step selection change message
      const selectedStepSubject = subjects[Messages.CHANGE_STEP_SELECTION]
      selectedStepSubject.next(stepSummary.step.id)
    } else if (stepSummary.step instanceof Block) {
      this.selectStep(stepSummary.step)

      // broadcast block selection change message
      const selectedBlockSubject = subjects[Messages.CHANGE_BLOCK_SELECTION]
      selectedBlockSubject.next(stepSummary.step)
    }
  }

  selectStep(step: Step) {
    this.currentStep = step
    this.selectedStep.emit({ step })
  }

  removeStep(step: Step) {
    const removeStepSubject = subjects[Messages.REMOVE_STEP]
    removeStepSubject.next(step)
  }

  isBlock(step: Executable) {
    return step instanceof Block
  }

  hasPreview(step: Executable) {
    return step instanceof Step && step.command.type !== COMMAND_TYPES.FLOW
  }

  drawStepPreview(parent: ElementRef, count: number) {
    const nodes = this.visualization.executeUntil(count),
      height = this.visualization.dimensions.height,
      width = this.visualization.dimensions.width,
      svg = convertObjectModel(AdapterTypes.SVG, nodes, parent.clientHeight, parent.clientWidth, `0 0 ${width} ${height}`)

    if (svg) {
      parent.innerHTML = ''
      parent.appendChild(svg)
    }
  }
}
