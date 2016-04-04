import { Component } from 'angular2/core'
import { PapyrusVisualizations } from './core/visualizations'
import { PapyrusEditor } from './core/editor'
import { CompositeVisualization } from '../models/visualization'

@Component({
  selector: 'papyrus-shell',
  template: `
    <div class="row row-no-padding">
      <pa-visualizations class="col col-md-12"
        [visualizations]="visualizations"
        (onSelect)="select($event)"
      >
      </pa-visualizations>
    </div>
    <div class="row row-no-padding">
      <pa-editor class="col col-md-12">
      
      </pa-editor>
    </div>
  `,
  directives: [PapyrusVisualizations, PapyrusEditor]
})
export class PapyrusShell {
  visualizations: CompositeVisualization[] = []
  activeVisualization: CompositeVisualization = null
  
  select(e) {
    this.activeVisualization = e.selected
    this.load(e.selected)
  }
  
  load(vis) {
    console.log(vis.id)
  }
}
