import { Component, Input, EventEmitter, Output } from 'angular2/core'
import { PapyrusData } from './data'
import { PapyrusSteps } from './steps'
import { PapyrusCanvas } from './canvas'
import { PanelComponent } from '../generic/panel'
import { FullLength } from 'src/web/directives/all'
import { CompositeVisualization } from '../../../dvu/gfx/visualization'
import { CommandService } from 'src/web/services/all'
import { Step } from '../../../dvu/core/step'
import { Command } from '../../../dvu/core/command'
import { Messages, subjects } from 'src/web/services/messages'

@Component({
  selector: 'pa-editor',
  template: `
    <div class="row row-no-padding" full-length>
      <div class="col col-md-3 sidebar" full-length>
        <div class="panel-toggles">
          <div class="visualizations-toggle" [class.toggled]="fullEditorMode">
            <i class="fa fa-bars" (click)="toggleFullEditorMode()"></i>
          </div>
          <input type="checkbox" id="showDataPanel" [(ngModel)]="showDataPanel" (ngModelChange)="onPanelSwitchToggle($event)"/>
          <label for="showDataPanel">Data</label>
          <input type="checkbox" id="showStepsPanel" [(ngModel)]="showStepsPanel" (ngModelChange)="onPanelSwitchToggle($event)"/>
          <label for="showStepsPanel">Steps</label>
          <input type="checkbox" id="showMeasuresPanel" [(ngModel)]="showMeasuresPanel" (ngModelChange)="onPanelSwitchToggle($event)"/>
          <label for="showMeasuresPanel">Measures</label>
        </div>

        <pa-data [data]="visualization?.data"
          [dataObservables]="visualization?.dataObservables"
          [datasetDefinition]="visualization?.datasetDefinition"
          *ngIf="showDataPanel"
          class="split-{{noOfPanelsEnabled}}"
         >
        </pa-data>
        <pa-steps [visualization]="visualization" *ngIf="showStepsPanel" class="split-{{noOfPanelsEnabled}}"></pa-steps>
        <pa-panel class="split-{{noOfPanelsEnabled}}" *ngIf="showMeasuresPanel" header="Measurements">
          <div></div>
        </pa-panel>
      </div>
      <div class="col col-md-9 editor" full-length>
        <pa-canvas [currentStep]="selectedStep" [visualization]="visualization" [commands]="commands" full-length></pa-canvas>
      </div>
    </div>
  `,
  directives: [PapyrusData, PapyrusSteps, PapyrusCanvas, FullLength, PanelComponent],
  providers: [CommandService]
})
export class PapyrusEditor {
  @Input()
  visualization: CompositeVisualization

  commands: Command[]
  selectedStep: Step

  showDataPanel: boolean = true
  showStepsPanel: boolean = true
  showMeasuresPanel: boolean = false
  fullEditorMode: boolean = false
  noOfPanelsEnabled: number = 2

  @Output()
  toggleEditorMode: EventEmitter = new EventEmitter()

  constructor(private commandService: CommandService) {
    const removeStepSubject = subjects[Messages.REMOVE_STEP]

    removeStepSubject.subscribe({
      next: (step) => {
        if (step) {
          this.visualization.block.remove(step)
        }
      }
    })

    this.commands = commandService.getCommands()
  }

  selectStep(e) {
    this.selectedStep = e.step
  }

  onPanelSwitchToggle(value: boolean) {
    this.noOfPanelsEnabled += (value ? 1 : -1)
  }

  toggleFullEditorMode() {
    this.fullEditorMode = !this.fullEditorMode
    this.toggleEditorMode.emit(this.fullEditorMode)
  }
}
