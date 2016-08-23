import { Component, Input, ViewChild, ElementRef, OnChanges, Output, EventEmitter } from 'angular2/core'
import { CompositePicture } from '../../../dsl/core/commands/composite/picture'
import { FocusMe } from '../../directives/focus_me'
import { PictureContext } from '../../../dsl/geometry/picture_context'
import { convertObjectModel, AdapterTypes } from '../../../dsl/adapters/adapter'

@Component({
  selector: 'pa-vis-preview',
  template: `
    <div class="vis-preview">
      <div class="del-icon">
        <i class="fa fa-trash" (click)="removeVisualization($event)"></i>
      </div>
      <div class="vis-preview-content" #preview></div>
      <div>
        <div class="vis-name" *ngIf="!nameBeingEdited" (dblclick)="editName()">{{visualization?.commandName}}</div>
        <input focus-me type="text" *ngIf="nameBeingEdited" [(ngModel)]="visualization.commandName" (blur)="saveName($event)" (keydown)="$event.keyCode === 13?saveName($event):undefined" />
      </div>
    </div>
  `,
  directives: [FocusMe]
})
export class VisualizationPreview implements OnChanges {
  @Input() visualization: CompositePicture
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
      this.drawVisualization()
    }
  }

  drawVisualization() {
    const parent = this.preview.nativeElement,
      nodes = this.visualization.execute(),
      height = this.visualization.dimensions.height,
      width = this.visualization.dimensions.width,
      svg = convertObjectModel(AdapterTypes.SVG, nodes, parent.clientHeight, parent.clientWidth, `0 0 ${width} ${height}`)

    if (svg) {
      parent.innerHTML = ''
      parent.appendChild(svg)
    }
  }

  removeVisualization(event: Event) {
    const visualization = this.visualization
    this.onRemove.emit({ visualization })

    event.stopPropagation()
  }
}
