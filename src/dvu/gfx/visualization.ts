import { PictureCommand, PictureCommandInterface } from '../core/commands/picture'
import { Step } from '../core/step'
import { DatasetDefinition } from '../core/data/dataset_definition'
import { PictureContext } from '../geometry/picture_context'
import { SVG } from '../core/helpers/svg'

export class CompositeVisualization extends PictureCommand {
  name: string = 'unnamed'
  datasetDefinition: DatasetDefinition = new DatasetDefinition()
  steps: Step[] = []

  constructor() {
    super(this.name, this.getPictureCommandInterface())

    this.datasetDefinition.addDataDefinition('length', 'number').setDefaultValue(20)
    this.datasetDefinition.addDataDefinition('width', 'number').setDefaultValue(50)
    this.datasetDefinition.addDataDefinition('measures', 'array').setDefaultValue([1,2,3,4,5])
  }

  getPictureCommandInterface(): PictureCommandInterface {
    return {
      name: this.name,
      onMousedown(context: PictureContext): Element {

      },
      onMousemove(element: Element, context: PictureContext): Element {

      },
      onMouseup(element: Element, context: PictureContext): Element {

      }
    }
  }
}

export const Picture = CompositeVisualization
