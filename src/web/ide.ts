import 'src/web/styles/main'

import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import {
  CommandBar,
  EditableField,
  PanelComponent,
  PapyrusCanvas,
  PapyrusData,
  PapyrusEditor,
  PapyrusShell,
  PapyrusSteps,
  PapyrusVisualizations,
  StepSummaryComponent,
  VisualizationCanvas,
  VisualizationPreview
} from './components'
import { PointTransform } from './pipes'
import { NgModule } from '@angular/core'

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [
    PapyrusData, CommandBar, EditableField, PanelComponent,
    PapyrusCanvas, PapyrusData, PapyrusEditor,
    PapyrusShell, PapyrusSteps, PapyrusVisualizations,
    StepSummaryComponent, VisualizationCanvas, VisualizationPreview,
    PointTransform
  ],
  bootstrap: [PapyrusShell]
})
export class PapyrusIDE {}
