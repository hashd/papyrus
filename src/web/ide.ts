import 'src/web/styles/main'

import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'

import { CommandBar, EditableField, PanelComponent, PapyrusCanvas,
  PapyrusData, PapyrusEditor, PapyrusShell, PapyrusSteps,
  PapyrusVisualizations, StepSummaryComponent, VisualizationCanvas, VisualizationPreview
} from './components'
import { PointTransform } from './pipes'
import { FocusMe, Tweakable, FullLength } from './directives'

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [
    PapyrusData, CommandBar, EditableField, PanelComponent,
    PapyrusCanvas, PapyrusData, PapyrusEditor,
    PapyrusShell, PapyrusSteps, PapyrusVisualizations,
    StepSummaryComponent, VisualizationCanvas, VisualizationPreview,
    FocusMe, Tweakable, FullLength, PointTransform
  ],
  bootstrap: [PapyrusShell]
})
export class PapyrusIDE {}
