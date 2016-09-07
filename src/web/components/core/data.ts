import { Component, Input } from '@angular/core'
import { PanelComponent as Panel } from '../generic/panel'
import { EditableField } from '../generic/editable'
import { DatasetDefinition } from '../../../dsl/core/data/dataset_definition'
import { DataDefinition } from '../../../dsl/core/data/data_definition'
import { Tweakable } from '../../directives/tweakable'

@Component({
  selector: 'pa-data',
  template: `
    <pa-panel header="Data">
      <div class="command-bar">
        <i class="fa fa-plus" (click)="addDataDefinition()"></i>
      </div>
      <ul class="variables">
        <li *ngFor="let dd of getDefinitions(false)">
          <pa-editable class="vname" [data]="dd.name" (edited)="saveName(dd, $event)" title="{{dd.name}}"></pa-editable>
          <pa-editable class="vvalue" [data]="dd.defaultValue" (edited)="saveValue(dd, $event)" tweakable></pa-editable>
        </li>
      </ul>
      <ul class="iterables">
        <li *ngFor="let dd of getDefinitions(true)">
          <span class="vname" title="{{dd.name}}">
            <span>{{dd.name}}</span>
          </span>
          <span class="vvalue">
            <span>{{dd.defaultValue}}</span>
          </span>
        </li>
      </ul>
      <div class="data-note" *ngIf="datasetDefinition?.dataDefinitions?.length === 0">
        No variables defined yet. <span (click)="addDataDefinition()">Add</span>
      </div>
    </pa-panel>
  `
})
export class PapyrusData {
  @Input() datasetDefinition: DatasetDefinition

  addDataDefinition() {
    this.datasetDefinition.addDataDefinition(undefined, 'number')
  }

  getDefinitions(isIterable: boolean) {
    return this.datasetDefinition !== null ? this.datasetDefinition.dataDefinitions.filter(d => isIterable ? (d.type === 'array') : (d.type !== 'array')) : null
  }

  saveName(dd: DataDefinition, e) {
    dd.name = e.value
  }

  saveValue(dd: DataDefinition, e) {
    dd.defaultValue = e.value
  }
}
