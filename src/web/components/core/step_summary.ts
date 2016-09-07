import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core'
import { Step, Executable } from '../../../dsl/core/step'
import { Block } from '../../../dsl/core/block'
import { StepSummary } from '../../../dsl/core/step_summary'
import { COMMAND_TYPES } from '../../../dsl/core/command_types'
import { PictureContext } from '../../../dsl/geometry/picture_context'
import { convertObjectModel, AdapterTypes } from '../../../dsl/adapters/adapter'
import { Messages, subjects } from '../../../web/services/messages'
import { CompositePicture } from '../../../dsl/core/commands/composite/picture'

@Component({
  selector: 'pa-step-summary',
  template: `
    <ul class="steps">
      <li
        class="step"
        [class.selected]="stepSummary.step === currentStep"
        *ngFor="let stepSummary of block?.getSummary(); let i = index;"
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
  `
})
export class StepSummaryComponent {
  @Input() block: Block<any>
  @Input() visualization: CompositePicture

  currentStep: Step<any>

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

  selectStep(step: Step<any>) {
    this.currentStep = step
    this.selectedStep.emit({ step })
  }

  removeStep(step: Step<any>) {
    const removeStepSubject = subjects[Messages.REMOVE_STEP]
    removeStepSubject.next(step)
  }

  isBlock(step: Executable<any>) {
    return step instanceof Block
  }

  hasPreview(step: Executable<any>) {
    return step instanceof Step && step.command.type !== COMMAND_TYPES.FLOW
  }

  drawStepPreview(parent: ElementRef, count: number) {
    const nodes = this.visualization.executeUntil(count),
          parentElement = parent.nativeElement,
          height = this.visualization.dimensions.height,
          width = this.visualization.dimensions.width,
          svg = convertObjectModel(AdapterTypes.SVG, nodes, parentElement.clientHeight, parentElement.clientWidth, `0 0 ${width} ${height}`)

    if (svg) {
      parentElement.innerHTML = ''
      parentElement.appendChild(svg)
    }
  }
}
