import { Component, Input } from 'angular2/core'

@Component({
  selector: 'pa-panel',
  template: `
    <div class="pa-panel">
      <div class="title">{{title}}</div>
      <div class="content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .pa-panel > div {
      padding: 4px 12px;
    }
  `]
})
export class PanelComponent {
  @Input()
  title: string
}
