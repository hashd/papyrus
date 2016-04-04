import { Component } from 'angular2/core'
import { PanelComponent } from '../generic/panel'

@Component({
  selector: 'pa-visualizations',
  template: `
    <pa-panel title="Visualizations">
      <h1>Visualization</h1>
    </pa-panel>
  `,
  directives: [PanelComponent]
})
export class PapyrusVisualizations {
  
}
