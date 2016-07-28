import { Component, Input, Output, EventEmitter, OnInit } from 'angular2/core'
import { PanelComponent } from '../generic/panel'
import { VisualizationPreview } from './visualization_preview'
import { CompositeVisualization } from '../../../dvu/gfx/visualization'
import { CommandService } from 'src/web/services/command'

@Component({
  selector: 'pa-visualizations',
  template: `
    <pa-panel header="Pictures">
      <pa-vis-preview *ngFor="#visualization of visualizations" 
        (click)="select(visualization)"
        [class.selected]="visualization === selected"
        [visualization]="visualization"
        [arity]="visualization?.steps.length"
        (onRemove)="removeVisualization($event)"
      >
      
      </pa-vis-preview>
      <pa-create-vis (click)="create()">
        <i class="fa fa-plus-circle"></i>
      </pa-create-vis>
    </pa-panel>
  `,
  directives: [PanelComponent, VisualizationPreview],
  providers: [CommandService]
})
export class PapyrusVisualizations implements OnInit {
  @Input()
  visualizations: CompositeVisualization[]
  selected: CompositeVisualization

  @Output()
  onSelect = new EventEmitter()

  constructor(private commandService: CommandService) {}

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
    let vis = new CompositeVisualization()
    this.visualizations.push(vis)
    this.commandService.addCommand(vis)
    this.select(vis)
  }
  
  removeVisualization({ visualization }) {
    const index = this.visualizations.indexOf(visualization)
    this.visualizations.splice(index, 1)

    if (this.visualizations.length === 0) {
      this.create()
    } else {
      const nextIndex = (index === this.visualizations.length) ? index - 1: index
      this.select(this.visualizations[nextIndex])
    }
  }
}
