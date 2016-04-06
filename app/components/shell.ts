import { Component } from 'angular2/core'
import { PapyrusVisualizations } from './core/visualizations'
import { PapyrusEditor } from './core/editor'
import { CompositeVisualization } from '../models/visualization'
import { FullLength } from '../directives/all'

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
    <div class="row row-no-padding" [style.height]="'calc(100% - 157px)'">
      <pa-editor [visualization]="activeVisualization" class="col col-md-12" full-length>
      
      </pa-editor>
    </div>
  `,
  directives: [PapyrusVisualizations, PapyrusEditor, FullLength]
})
export class PapyrusShell {
  visualizations: CompositeVisualization[] = []
  activeVisualization: CompositeVisualization = null
  
  select(e) {
    this.activeVisualization = e.selected
  }
}
