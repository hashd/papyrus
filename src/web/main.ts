import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { PapyrusIDE } from './ide'

const platform = platformBrowserDynamic()
platform.bootstrapModule(PapyrusIDE)
