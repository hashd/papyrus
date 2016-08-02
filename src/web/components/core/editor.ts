import { Component, Input } from 'angular2/core'
import { PapyrusData } from './data'
import { PapyrusSteps } from './steps'
import { PapyrusCanvas } from './canvas'
import { FullLength } from 'src/web/directives/all'
import { CompositeVisualization } from '../../../dvu/gfx/visualization'
import { CommandService } from 'src/web/services/all'
import { Step } from '../../../dvu/core/step'
import { Command } from '../../../dvu/core/command'
import { Messages, Subjects } from 'src/web/services/messages'

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

        <pa-steps [steps]="visualization?.block?.steps" [style.height]="'50%'" (selectedStep)="selectStep($event)" (removedStep)="removeStep($event)"></pa-steps>
      </div>
      <div class="col col-md-9 editor" full-length>
        <pa-canvas [currentStep]="selectedStep" [visualization]="visualization" [commands]="commands" full-length></pa-canvas>
      </div>
    </div>
  `,
  directives: [PapyrusData, PapyrusSteps, PapyrusCanvas, FullLength],
  providers: [CommandService]
})
export class PapyrusEditor {
  @Input()
  visualization: CompositeVisualization
  commands: Command[]
  selectedStep: Step

  constructor(private commandService: CommandService) {
    this.commands = commandService.getCommands()
  }

  selectStep(e) {
    this.selectedStep = e.step
  }

  removeStep(e) {
    this.visualization.block.remove(e.step);

    //to refresh the visualization canvas
    const removeStepSubject = Subjects[Messages.REMOVE_STEP];
    removeStepSubject.next(e.step.uuid);
  }
}
