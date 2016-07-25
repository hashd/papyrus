import { Component } from 'angular2/core'
import { PapyrusVisualizations } from './core/visualizations'
import { PapyrusEditor } from './core/editor'
import { CompositeVisualization } from 'src/dvu/gfx/visualization'
import { FullLength } from '../directives/all'

@Component({
  selector: 'papyrus-shell',
  template: `
  
    <div class="editor-space row row-no-padding">
     <pa-visualizations class="col-md-2"
        [visualizations]="visualizations"
        (onSelect)="select($event)"
      >
      </pa-visualizations>

      <pa-editor [visualization]="activeVisualization" class="col-md-10" full-length>
      
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
