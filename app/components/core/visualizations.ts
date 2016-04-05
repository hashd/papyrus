import { Component, Input, Output, EventEmitter } from 'angular2/core'
import { PanelComponent } from '../generic/panel'
import { CompositeVisualization } from '../../models/visualization'

@Component({
  selector: 'pa-visualizations',
  template: `
    <pa-panel header="Visualizations">
      <pa-vis-preview *ngFor="#visualization of visualizations" 
        (click)="select(visualization)"
        [class.selected]="visualization === selected"  
      >
      </pa-vis-preview>
      <pa-create-vis (click)="create()">
        <i class="fa fa-plus-circle"></i>
      </pa-create-vis>
    </pa-panel>
  `,
  directives: [PanelComponent]
})
export class PapyrusVisualizations {
  @Input()
  visualizations: CompositeVisualization[]
  selected: CompositeVisualization
  
  @Output()
  onSelect = new EventEmitter()
  
  select(v: CompositeVisualization) {
    this.selected = v
    this.onSelect.emit({ selected: v })
  }
  
  
  /**
   * Create a new visualization and select it automatically
   */
  create() {
    let vis = new CompositeVisualization(undefined)
    this.visualizations.push(vis)
    this.select(vis)
  }
}
