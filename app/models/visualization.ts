import { Visualizable } from '../interfaces/visualization'
import { Step } from './step'

export class CompositeVisualization implements Visualizable {
  _dataDef: Object
  _steps: Step[]
  parent: Visualizable
  
  draw(data) {
    this._steps.forEach(s => s.draw())
  }
  
  move(x, y) {
    
  }
  
  scale(xRatio, yRatio) {
    
  }
  
  rotate(angle) {
    
  }
}
