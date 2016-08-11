import { Component, Input, ViewChild, ElementRef, OnChanges, Output, EventEmitter } from 'angular2/core'
import { CompositeVisualization } from '../../../dvu/gfx/visualization'
import { FocusMe } from '../../directives/focus_me'
import { PictureContext } from '../../../dvu/geometry/picture_context'

const PREVIEW_OPACITY = 0.1

@Component({
  selector: 'pa-vis-preview',
  template: `
    <div class="vis-preview">
      <div class="del-icon">
        <i class="fa fa-trash" (click)="removeVisualization($event)"></i>
      </div>
      <svg opacity="${PREVIEW_OPACITY}" xmlns="http://www.w3.org/2000/svg" version="1.1" preserveAspectRatio="xMidYMid slice" width="90px" height="74px" #preview>

      </svg>
      <div>
        <div class="vis-name" *ngIf="!nameBeingEdited" (dblclick)="editName()">{{visualization?.commandName}}</div>
        <input focus-me type="text" *ngIf="nameBeingEdited" [(ngModel)]="visualization.commandName" (blur)="saveName($event)" (keydown)="$event.keyCode === 13?saveName($event):undefined" />
      </div>
    </div>
  `,
  directives: [FocusMe]
})
export class VisualizationPreview implements OnChanges {
  @Input() visualization: CompositeVisualization
  @Input() arity: number

  @Output() onRemove = new EventEmitter()

  nameBeingEdited: boolean = false
  previousName: string

  @ViewChild('preview') preview: ElementRef

  editName() {
    this.previousName = this.visualization.commandName
    this.nameBeingEdited = true
  }

  saveName(e) {
    if (this.visualization.commandName === '') {
      this.visualization.commandName = this.previousName
      this.previousName = undefined
    }

    this.nameBeingEdited = false
  }

  ngOnChanges(changes) {
    if (changes.hasOwnProperty('arity') && this.preview) {
      const preview = this.preview.nativeElement,
        width = this.visualization.dimensions.width || preview.clientWidth,
        height = this.visualization.dimensions.height || preview.clientHeight

      this.clearPreview()
      this.setPreviewDimensions(width, height)
      this.drawVisualization(width, height)
    }
  }

  setPreviewDimensions(width, height) {
    this.preview.nativeElement.setAttribute('viewBox', `0 0 ${width} ${height}`)
  }

  drawVisualization(width, height) {
    const preview = this.preview.nativeElement
    const pictureContext = new PictureContext({x: 0, y: 0}, {x: width, y: height})
    const element = this.visualization.execute(pictureContext).element

    if (element) {
      preview.appendChild(element)
    }
  }

  removeVisualization(event: Event) {
    const visualization = this.visualization
    this.onRemove.emit({ visualization })

    event.stopPropagation()
  }

  private clearPreview() {
    while (this.preview.nativeElement.firstChild) {
      this.preview.nativeElement.removeChild(this.preview.nativeElement.firstChild)
    }
  }
}
