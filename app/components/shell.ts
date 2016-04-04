import { Component } from 'angular2/core'
import { PapyrusVisualizations } from './core/visualizations'
import { PapyrusEditor } from './core/editor'

@Component({
  selector: 'papyrus-shell',
  template: `
    <div class="row row-no-padding">
      <pa-visualizations class="col col-md-12">
      
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
}
