import { Component, Input, AfterContentInit} from 'angular2/core';
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
        (click)="editName()"
      >{{visualization?.name}}</div>
      <input focus-me
        type="text"
        *ngIf="nameBeingEdited" 
        [(ngModel)]="visualization.name"
        (blur)="saveName()"
      />
    </div>
  `,
  directives: [FocusMe]
})
export class VisualizationPreview implements AfterContentInit {
  @Input()
  visualization: CompositeVisualization
  nameBeingEdited: boolean = false
  
  editName() {
    this.nameBeingEdited = true
  }
  
  saveName() {
    this.nameBeingEdited = false
  }
}