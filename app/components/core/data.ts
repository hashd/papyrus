import { Component, Input } from 'angular2/core'
import { PanelComponent as Panel } from '../generic/panel'
import { DatasetDefinition } from '../../models/dataset_definition'
import { DataDefinition } from '../../models/data_definition'

@Component({
  selector: 'pa-data',
  template: `
    <pa-panel header="Data">
      <div class="command-bar">
        <i class="fa fa-plus" (click)="addDataDefinition()"></i>
      </div>
      <table class="data-table">
        <tbody>
          <tr *ngFor="#dd of datasetDefinition?.dataDefinitions">
            <td><span class="vname">{{dd.name}}</span></td>
            <td>{{getValue(dd.name)}}</td>
          </tr>
        </tbody>
      </table>
    </pa-panel>
  `,
  directives: [Panel]
})
export class PapyrusData {
  @Input() data: Object
  @Input() dataObservables: Object
  @Input() datasetDefinition: DatasetDefinition
  
  getValue(name: string) {
    return this.data[name]
  }
  
  addDataDefinition() {
    this.datasetDefinition.addDataDefinition('unnamed', undefined)
  }
}
