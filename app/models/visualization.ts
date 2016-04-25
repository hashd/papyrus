import { Visualizable } from '../interfaces/visualization'
import { Step } from './step'
import { DatasetDefinition } from './dataset_definition'

export class CompositeVisualization implements Visualizable {
  id: string
  name: string = 'unnamed'
  parent: Visualizable
  
  data: Object = {}
  dataObservables: Object = {}
  datasetDefinition: DatasetDefinition = new DatasetDefinition()
  
  steps: Step[]
  
  constructor(parent) {
    this.id = 'pa-vis-' + (+new Date())
    this.parent = parent
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
