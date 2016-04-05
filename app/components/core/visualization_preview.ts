import { Component, Input, AfterContentInit} from 'angular2/core'
import { CompositeVisualization } from '../../models/visualization'
import { FocusMe } from '../../directives/focus_me'

@Component({
  selector: 'pa-vis-preview',
  template: `
    <div class="vis-preview">
    
    </div>
    <div>
      <div class="vis-name" 
        *ngIf="!nameBeingEdited"
        (dblclick)="editName()"
      >{{visualization?.name}}</div>
      <input focus-me
        type="text"
        *ngIf="nameBeingEdited" 
        [(ngModel)]="visualization.name"
        (blur)="saveName($event)"
        (keydown)="$event.keyCode === 13?saveName($event):undefined"
      />
    </div>
  `,
  directives: [FocusMe]
})
export class VisualizationPreview implements AfterContentInit {
  @Input()
  visualization: CompositeVisualization
  nameBeingEdited: boolean = false
  previousName: string
  
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
}
