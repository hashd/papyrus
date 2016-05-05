import 'angular2/bundles/angular2-polyfills'
import '../styles/core.ts!typescript'
//you may need es6-shim if you get an error relating to list.fill
//import es6-shim;

import { bootstrap } from 'angular2/platform/browser'
import { PapyrusShell } from './components/shell'

bootstrap(PapyrusShell)
