import { Component, Input } from 'angular2/core'
import { PapyrusData } from './data'
import { PapyrusSteps } from './steps'
import { PapyrusCanvas } from './canvas'
import { FullLength } from '../../directives/all'
import { Command } from '../../interfaces/command'
import { CompositeVisualization } from '../../models/visualization'
import { CommandService } from '../../services/all'
 
@Component({
  selector: 'pa-editor',
  template: `
    <div class="row row-no-padding" full-length>
      <div class="col col-md-3 sidebar" full-length>
        <pa-data [data]="visualization?.data" 
          [dataObservables]="visualization?.dataObservables"
          [datasetDefinition]="visualization?.datasetDefinition"
          [style.height]="'50%'">
        </pa-data>
        <pa-steps [steps]="visualization?.steps" [style.height]="'50%'"></pa-steps>
      </div>
      <div class="col col-md-9 editor" full-length>
        <pa-canvas [visualization]="visualization" [commands]="commands" full-length></pa-canvas>
      </div>
    </div>
  `,
  directives: [PapyrusData, PapyrusSteps, PapyrusCanvas, FullLength],
  providers: [CommandService]
})
export class PapyrusEditor {
  @Input()
  visualization: CompositeVisualization
  commands: Object
  
  constructor(private commandService: CommandService) {
    this.commands = commandService.getCommands()
  }
}
