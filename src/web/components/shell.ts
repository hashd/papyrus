import { Component } from 'angular2/core'
import { PapyrusVisualizations } from './core/visualizations'
import { PapyrusEditor } from './core/editor'
import { CompositePicture } from 'picture.ts'
import { FullLength } from '../directives/all'

@Component({
  selector: 'papyrus-shell',
  template: `
    <div class="editor-space row row-no-padding" [class.full-editor-mode]="fullEditorEnabled">
     <pa-visualizations class="col-md-2"
        [visualizations]="visualizations"
        (onSelect)="select($event)"
      >
      </pa-visualizations>

      <pa-editor [visualization]="activeVisualization" class="col-md-10" (toggleEditorMode)="toggleFullEditorMode(e)" full-length>

      </pa-editor>
    </div>
  `,
  directives: [PapyrusVisualizations, PapyrusEditor, FullLength]
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
}
