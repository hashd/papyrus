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
  }

  execute(context: PictureContext, depth: number = 0): Picture {
    if (depth < 10) {
      const elements: Element[] = this.steps.map(step => step.execute(depth).element)
      const group = SVG.createSVG(elements, context, this.dimensions)

      return {
        name: this.name,
        element: group
      }
    } else {
      return {
        name: 'Void',
        element: SVG.createGroup([], this.dimensions.width, this.dimensions.height)
      }
    }
  }

  executeUntil(number: number, context: PictureContext, depth: number = 0) {
    const elements: Element[] = []
    for (let i = 0; i < number && i < this.steps.length; i++) {
      elements.push(this.steps[i].execute(depth))
    }

    const group = SVG.createGroup(elements, context.getWidth(), context.getHeight())

    return {
      name: this.name,
      element: group
    }
  }

  getPictureCommandInterface(): PictureCommandInterface {
    const self = this
    return {
      name: self.name,
      onMousedown(context: PictureContext): Element {

      },
      onMousemove(element: Element, context: PictureContext): Element {

      },
      onMouseup(element: Element, context: PictureContext): Element {

      },
      getSummary(data: PictureContext): string {
        const lsp = data.getLeastSignificantPoint()
        return `Draw ${self.name} from (${lsp.x}, ${lsp.y}) with width: ${data.getWidth()} and height: ${data.getHeight()}`
      }
    }
  }
}

export const Picture = CompositeVisualization
