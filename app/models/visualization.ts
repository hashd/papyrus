import { ElementRef } from 'angular2/core'
import { DrawCommand } from '../interfaces/command'
import { Visualizable } from '../interfaces/visualization'
import { Step } from './step'
import { DatasetDefinition } from './dataset_definition'

export class CompositeVisualization extends DrawCommand implements Visualizable {
  id: string
  name: string = 'unnamed'
  
  data: Object = {}
  dataObservables: Object = {}
  datasetDefinition: DatasetDefinition = new DatasetDefinition()
  
  steps: Step[] = []
  
  constructor(private parent: ElementRef) {
    super(parent)
    
    this.id = 'pa-vis-' + (+new Date())
    this.datasetDefinition.addDataDefinition('length', 'number')
    this.datasetDefinition.addDataDefinition('width', 'number')
    this.datasetDefinition.addDataDefinition('measures', 'array')
    
    this.data = {
      length: 20,
      width: 50,
      measures: [1,2,3,4,5]
    }
  }
  
  draw(data) {
    this.steps.forEach(s => s.execute(data))
  }
  
  move(x, y) {
    
  }
  
  scale(xRatio, yRatio) {
    
  }
  
  rotate(angle) {
    
  }
}
