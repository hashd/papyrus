import { Component } from 'angular2/core'
import { PanelComponent as Panel } from '../generic/panel'

@Component({
  selector: 'pa-steps',
  template: `
    <pa-panel header="Steps">
    
    </pa-panel>
  `,
  directives: [Panel]
})
export class PapyrusSteps {
  
}