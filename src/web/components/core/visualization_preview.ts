import { Component, Input, AfterViewInit, ViewChild, ElementRef, OnChanges } from 'angular2/core'
import { CompositeVisualization } from '../../../dvu/gfx/visualization'
import { FocusMe } from '../../directives/focus_me'
import { PictureContext } from 'src/dvu/geometry/picture_context'
import { Observable } from 'rxjs/Rx'

@Component({
  selector: 'pa-vis-preview',
  template: `
    <div class="vis-preview">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" preserveAspectRatio="xMidYMid slice" width="96px" height="80px" #preview>
      
      </svg>
    </div>
    <div>
      <div class="vis-name" *ngIf="!nameBeingEdited" (dblclick)="editName()">{{visualization?.name}}</div>
      <input focus-me type="text" *ngIf="nameBeingEdited" [(ngModel)]="visualization.name" (blur)="saveName($event)" (keydown)="$event.keyCode === 13?saveName($event):undefined" />
    </div>
  `,
  directives: [FocusMe]
})
export class VisualizationPreview implements OnChanges {
  @Input() visualization: CompositeVisualization
  @Input() arity: number

  nameBeingEdited: boolean = false
  previousName: string

  @ViewChild('preview') preview: ElementRef

  editName() {
    this.previousName = this.visualization.name
    this.nameBeingEdited = true
  }

  saveName(e) {
    if (this.visualization.name === '') {
      this.visualization.name = this.previousName
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
    const pictureContext = new PictureContext({x:0, y:0}, {x:width,y:height})
    const element = this.visualization.execute(pictureContext).element

    preview.appendChild(element)
  }

  private clearPreview() {
    while (this.preview.nativeElement.firstChild) {
      this.preview.nativeElement.removeChild(this.preview.nativeElement.firstChild)
    }
  }
}
