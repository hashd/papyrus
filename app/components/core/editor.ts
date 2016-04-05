import { Component, Input } from 'angular2/core'
import { PapyrusData } from './data'
import { PapyrusSteps } from './steps'
import { PapyrusCanvas } from './canvas'
import { FullLength } from '../../directives/all'
 
@Component({
  selector: 'pa-editor',
  template: `
    <div class="row row-no-padding" full-length>
      <div class="col col-md-3 sidebar" full-length>
        <pa-data [style.height]="'50%'"></pa-data>
        <pa-steps [style.height]="'50%'"></pa-steps>
      </div>
      <div class="col col-md-9 editor" full-length>
        <pa-canvas full-length></pa-canvas>
      </div>
    </div>
  `,
  directives: [PapyrusData, PapyrusSteps, PapyrusCanvas, FullLength]
})
export class PapyrusEditor {
  
}
