import { Component } from 'angular2/core'
import { PanelComponent as Panel } from '../generic/panel'

@Component({
  selector: 'pa-canvas',
  template: `
    <pa-panel header="Canvas">
    
    </pa-panel>
  `,
  directives: [Panel]
})
export class PapyrusCanvas {
  
}
