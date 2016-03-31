import { Component } from 'angular2/core'
import * as d3 from 'd3'

@Component({
  selector: 'papyrus-shell',
  template: `
    <div class="row">
      <div class="col col-md-24">
        <h4>Hello {{name}}</h4>
      </div>
    </div>
    <div class="row">
      <div class="col col-md-6"></div>
      <div class="col col-md-18"></div>
    </div>
  `
})
export class PapyrusShell {
  name: string

  constructor() {
    console.log(d3)
    this.name = 'World';
    setTimeout(() => this.name = 'World!!!', 1500)
  }
}
