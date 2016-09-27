import { Component } from '@angular/core'
import { PapyrusVisualizations } from './core/visualizations'
import { PapyrusEditor } from './core/editor'
import { CompositePicture } from './../../dsl/core/commands/composite/picture'
import { FullLength } from '../directives/all'
import { subjects, Messages } from '../services/messages'

@Component({
  selector: 'papyrus-shell',
  template: `
    <div class="editor-space row row-no-padding" 
      [class.full-editor-mode]="fullEditorEnabled"
      (keydown)="handleKeydownEvent($event)"
      (keyup)="handleKeyupEvent($event)"
      tabindex=1
      autofocus
    >
      <pa-visualizations class="col-md-2"
        [visualizations]="visualizations"
        (onSelect)="select($event)"
      >
      </pa-visualizations>

      <pa-editor [visualization]="activeVisualization" class="col-md-10" (toggleEditorMode)="toggleFullEditorMode(e)" full-length>

      </pa-editor>
    </div>
  `
})
export class PapyrusShell {
  visualizations: CompositePicture[] = []
  activeVisualization: CompositePicture = null
  fullEditorEnabled: boolean = false

  select(e) {
    this.activeVisualization = e.selected
  }

  toggleFullEditorMode(e) {
    this.fullEditorEnabled = !this.fullEditorEnabled
  }

  handleKeydownEvent(event: Event) {
    subjects[Messages.KEYBOARD_SHORTCUT].next(event)
  }

  handleKeyupEvent(event: Event) {
    subjects[Messages.KEYBOARD_SHORTCUT_UP].next(event)
  }
}
