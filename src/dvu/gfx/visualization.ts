import { PictureCommand, PictureCommandInterface } from '../core/commands/picture'
import { Step } from '../core/step'
import { DatasetDefinition } from '../core/data/dataset_definition'
import { PictureContext } from '../geometry/picture_context'
import { SVG } from '../core/helpers/svg'
import { Dimensions } from 'src/dvu/geometry/dimensions'
import { Picture } from 'src/dvu/core/models/picture'

export class CompositeVisualization extends PictureCommand {
  name: string = 'unnamed'
  datasetDefinition: DatasetDefinition = new DatasetDefinition()
  dimensions: Dimensions = { width: 0, height: 0 }
  steps: Step[] = []

  constructor() {
    super(this.name, this.getPictureCommandInterface())

    this.datasetDefinition.addDataDefinition('length', 'number').setDefaultValue(20)
    this.datasetDefinition.addDataDefinition('width', 'number').setDefaultValue(50)
    this.datasetDefinition.addDataDefinition('measures', 'array').setDefaultValue([1,2,3,4,5])
  }

  execute(context: PictureContext): Picture {
    const elements: Element[] = this.steps.map(step => step.execute().element)
    const group = SVG.createSVG(elements, context, this.dimensions)

    return {
      name: this.name,
      element: group
    }
  }

  executeUntil(number: number, context: PictureContext) {
    const elements: Element[] = []
    for (let i = 0; i < number && i < this.steps.length; i++) {
      elements.push(this.steps[i].execute())
    }

    const group = SVG.createGroup(elements, context.getWidth(), context.getHeight())

    return {
      name: this.name,
      element: group
    }
  }

  getPictureCommandInterface(): PictureCommandInterface {
    return {
      name: this.name,
      onMousedown(context: PictureContext): Element {

      },
      onMousemove(element: Element, context: PictureContext): Element {

      },
      onMouseup(element: Element, context: PictureContext): Element {

      },
      getSummary(data: PictureContext): string {
        const lsp = data.getLeastSignificantPoint()
        return `Draw ${this.name} from (${lsp.x}, ${lsp.y}) with width: ${data.getWidth()} and height: ${data.getHeight()}`
      }
    }
  }
}

export const Picture = CompositeVisualization
