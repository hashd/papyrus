import { Component, Input } from 'angular2/core'
import { PanelComponent as Panel } from '../generic/panel'
import { EditableField } from '../generic/editable'
import { DatasetDefinition } from '../../models/dataset_definition'
import { DataDefinition } from '../../models/data_definition'
import { Tweakable } from '../../directives/tweakable'

@Component({
  selector: 'pa-data',
  template: `
    <pa-panel header="Data">
      <div class="command-bar">
        <i class="fa fa-plus" (click)="addDataDefinition()"></i>
      </div>
      <ul class="variables">
        <li *ngFor="#dd of getDefinitions(false)">
          <pa-editable class="vname" [data]="dd.name" (edited)="saveName(dd, $event)" title="{{dd.name}}"></pa-editable>
          <pa-editable class="vvalue" [data]="getValue(dd.name)" (edited)="saveValue(dd.name, $event)" tweakable></pa-editable>
        </li>     
      </ul>
      <ul class="iterables">
        <li *ngFor="#dd of getDefinitions(true)">
          <span class="vname" title="{{dd.name}}">
            <span>{{dd.name}}</span>
          </span>
          <span class="vvalue">
            <span>{{getValue(dd.name)}}</span>
          </span>
        </li>
      </ul>
    </pa-panel>
  `,
  directives: [Panel, EditableField, Tweakable]
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
  
  saveName(dd: DataDefinition, e) {
    dd.name = e.value
    this.data[dd.name] = this.data[e.prevValue]
    
    console.log(this.data)
    delete this.data[e.prevValue]
  }
  
  saveValue(name: string, e) {
    this.data[name] = e.value
  }
}
