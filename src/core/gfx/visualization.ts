import { PictureCommand } from 'src/core/main/command'
import { Step } from 'src/core/main/step'
import { DatasetDefinition } from 'src/core/main/data/dataset_definition'

export class CompositeVisualization extends PictureCommand {
  name: string = 'unnamed'

  data: Object = {}
  dataObservables: Object = {}
  datasetDefinition: DatasetDefinition = new DatasetDefinition()

  steps: Step[] = []

  constructor() {
    super()

    this.datasetDefinition.addDataDefinition('length', 'number')
    this.datasetDefinition.addDataDefinition('width', 'number')
    this.datasetDefinition.addDataDefinition('measures', 'array')

    this.data = {
      length: 20,
      width: 50,
      measures: [1,2,3,4,5]
    }
  }
}

export const Picture = CompositeVisualization
