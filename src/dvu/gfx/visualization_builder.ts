import {PictureCommand} from 'src/dvu/core/commands/picture'
import {DatasetDefinition} from 'src/dvu/core/data/dataset_definition'
import {Step} from 'src/dvu/core/step'

export interface VisualizationBuilder {
  build(): PictureCommand
}

export class CompositeVisualizationBuilder implements VisualizationBuilder {
  constructor(public datasetDefinition: DatasetDefinition = new DatasetDefinition(), public steps: Step[] = []) {

  }
  
  addStep(step: Step) {
    this.steps.push(step)
  }
  
  getStep(idx: number) {
    return this.steps[idx]
  }

  build(): PictureCommand {
    return class CompositeVisualization extends PictureCommand {
      steps: Step[] = this.steps
    }
  }
}
