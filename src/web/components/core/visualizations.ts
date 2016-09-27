import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { PanelComponent } from '../generic/panel'
import { VisualizationPreview } from './visualization_preview'
import { CompositePicture } from '../../../dsl/core/commands/composite/picture'
import { CommandService } from 'src/web/services/command'
import { subjects, Messages } from 'src/web/services/messages'

@Component({
  selector: 'pa-visualizations',
  template: `
    <pa-panel header="Papyrus">
      <pa-vis-preview *ngFor="let visualization of visualizations; let i = index;"
        (click)="select(visualization)"
        [class.selected]="visualization === selected"
        [class.selector-mode]="keyboardSelectorEnabled"
        [visualization]="visualization"
        [index]="i+1"
        [arity]="visualization?.block?.steps.length"
        (onRemove)="removeVisualization($event)"
      >

      </pa-vis-preview>
      <span class="pa-create-vis" (click)="create()">
        <i class="fa fa-plus-circle"></i>
      </span>
    </pa-panel>
  `,
  providers: [CommandService]
})
export class PapyrusVisualizations implements OnInit {
  @Input()
  visualizations: CompositePicture[] = []
  selected: CompositePicture = null
  keyboardSelectorEnabled: boolean = false

  @Output()
  onSelect = new EventEmitter()

  constructor(private commandService: CommandService) {}

  ngOnInit() {
    if (this.visualizations.length === 0) {
      this.create()
    }

    this.subscribeEvents()
  }

  select(v: CompositePicture) {
    this.selected = v
    this.onSelect.emit({ selected: v })
  }

  /**
   * Create a new visualization and select it automatically
   */
  create() {
    let vis = new CompositePicture()
    this.visualizations.push(vis)
    this.commandService.addCommand(vis)
    this.select(vis)
  }

  removeVisualization({ visualization }) {
    const index = this.visualizations.indexOf(visualization)
    this.visualizations.splice(index, 1)

    if (visualization === this.selected) {
      // If user is attempting to delete the selected visualization
      if (this.visualizations.length === 0) {
        // If no.of visualizations is 0, then create a new one and preselect that
        this.create()
      } else {
        // else select the next one in the list if it exists, otherwise the previous one
        const nextIndex = (index === this.visualizations.length) ? index - 1 : index
        this.select(this.visualizations[nextIndex])
      }
    }
  }

  subscribeEvents() {
    subjects[Messages.KEYBOARD_SHORTCUT].subscribe((e: KeyboardEvent) => this.handleKeyboardShortcut(e))
    subjects[Messages.KEYBOARD_SHORTCUT_UP].subscribe((e: KeyboardEvent) => this.handleKeyboardShortcutUp(e))
  }

  handleKeyboardShortcut(event: KeyboardEvent) {
    if (event.ctrlKey && ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105))) {
      let idx = (event.keyCode >= 48 && event.keyCode <= 57) ? event.keyCode - 48 : event.keyCode - 96
      idx = idx === 0 ? 10 : idx

      // If visualization at that index exists, select else just ignore
      if (idx <= this.visualizations.length) {
        this.select(this.visualizations[idx - 1])
      }
    } else if (event.ctrlKey && event.key === 'n') {
      this.create()
    } else if (event.ctrlKey === true) {
      this.keyboardSelectorEnabled = true
    }
  }

  handleKeyboardShortcutUp(event: KeyboardEvent) {
    if (event.key === 'Control') {
      this.keyboardSelectorEnabled = false
    }
  }
}
