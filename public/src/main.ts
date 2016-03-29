import 'angular2/bundles/angular2-polyfills';
//you may need es6-shim if you get an error relating to list.fill
//import es6-shim;

import { Component } from 'angular2/core'
import { bootstrap } from 'angular2/platform/browser'

@Component({
  selector: 'hello-world',
  template: '<h4>Hello {{name}}</h4>'
})
export class HelloWorld {
  name: string
  constructor() {
    this.name = 'World';
    setTimeout(() => this.name = 'World!!!', 1500)
  }
}

bootstrap(HelloWorld)