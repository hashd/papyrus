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
      <ul class="variables">
        <li *ngFor="#dd of getDefinitions(false)">
          <span class="vname" title="{{dd.name}}">{{dd.name}}</span>
          <span class="vvalue">{{getValue(dd.name)}}</span>
        </li>     
      </ul>
      <ul class="iterables">
        <li *ngFor="#dd of getDefinitions(true)">
          <span class="vname" title="{{dd.name}}">{{dd.name}}</span>
          <span class="vvalue">{{getValue(dd.name)}}</span>
        </li>
      </ul>
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
    const dd = this.datasetDefinition.addDataDefinition(undefined, undefined)
    
    // Set default value in data
    this.data[dd.name] = 0
  }
  
  getDefinitions(isIterable: boolean) {
    return this.datasetDefinition !== null? this.datasetDefinition.dataDefinitions.filter(d => isIterable? (d.type === 'array'): (d.type !== 'array')): null
  }
}
