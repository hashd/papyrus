import { Component, Input } from 'angular2/core'
import { PapyrusData } from './data'
import { PapyrusSteps } from './steps'
import { PapyrusCanvas } from './canvas'
 
@Component({
  selector: 'pa-editor',
  template: `
    <div class="row row-no-padding">
      <div class="col col-md-3 sidebar">
        <pa-data></pa-data>
        <pa-steps></pa-steps>
      </div>
      <div class="col col-md-9 editor">
        <pa-canvas></pa-canvas>
      </div>
    </div>
  `,
  directives: [PapyrusData, PapyrusSteps, PapyrusCanvas]
})
export class PapyrusEditor {
  
}
