import { Component, Input, Output, EventEmitter, OnInit } from 'angular2/core'
import { PanelComponent } from '../generic/panel'
import { VisualizationPreview } from './visualization_preview'
import { CompositeVisualization } from '../../../dvu/gfx/visualization'

@Component({
  selector: 'pa-visualizations',
  template: `
    <pa-panel header="Visualizations">
      <pa-vis-preview *ngFor="#visualization of visualizations" 
        (click)="select(visualization)"
        [class.selected]="visualization === selected"
        [visualization]="visualization"  
      >
      </pa-vis-preview>
      <pa-create-vis (click)="create()">
        <i class="fa fa-plus-circle"></i>
      </pa-create-vis>
    </pa-panel>
  `,
  directives: [PanelComponent, VisualizationPreview]
})
export class PapyrusVisualizations implements OnInit {
  @Input()
  visualizations: CompositeVisualization[]
  selected: CompositeVisualization
  
  @Output()
  onSelect = new EventEmitter()
  
  ngOnInit() {
    if (this.visualizations.length === 0) {
      this.create()
    }
  }
  
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
