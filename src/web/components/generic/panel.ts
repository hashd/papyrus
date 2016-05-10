import { Component, Input } from 'angular2/core'

@Component({
  selector: 'pa-panel',
  template: `
    <div class="pa-panel">
      <div class="title">{{header}}</div>
      <div class="content">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class PanelComponent {
  @Input()
  header: string
}
