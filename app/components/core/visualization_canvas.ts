import { Component, Input } from 'angular2/core'
import { CompositeVisualization } from '../../models/visualization'

@Component({
  selector: 'pa-vis-canvas',
  template: `
  
  `
})
export class VisualizationCanvas {
  @Input()
  visualization: CompositeVisualization
}