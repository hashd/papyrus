import { PictureCommand, PictureCommandInterface } from '../core/commands/picture'
import { Step } from '../core/step'
import { Scope } from './../core/scope'
import { DatasetDefinition } from '../core/data/dataset_definition'
import { PictureContext } from '../geometry/picture_context'
import { SVG } from '../core/helpers/svg'
import { CommandType } from '../core/command_types'
import { Dimensions } from 'src/dvu/geometry/dimensions'
import { Picture } from 'src/dvu/core/models/picture'

export class CompositeVisualization extends PictureCommand {
  name: string = 'unnamed'
  type: CommandType = 'composite'
  datasetDefinition: DatasetDefinition = new DatasetDefinition()
  dimensions: Dimensions = { width: 0, height: 0 }
  steps: Step[] = []

  constructor() {
    super(this.name, this.getPictureCommandInterface())
  }

  execute(context: PictureContext, scope: Scope = new Scope()): Picture {
    const depth = scope.depth

    if (depth < 10) {
      const elements: Element[] = this.steps.map(step => step.execute(new Scope(scope)).element)
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
      shortcutKey: '',
      noOfInstances: 0,
      onMousedown(context: PictureContext): Element {

      },
      onMousemove(element: Element, context: PictureContext): Element {
        element.setAttributeNS(null, 'width', context.getWidth())
        element.setAttributeNS(null, 'height', context.getHeight())

        return element
      },
      onMouseup(element: Element, context: PictureContext): Element {

      },
      getSummary(data: PictureContext): string {
        const lsp = data.getLeastSignificantPoint()
        return `Draw ${self.name} from (${lsp.x}, ${lsp.y}) with width: ${data.getWidth()} and height: ${data.getHeight()}`
      }
    }
  }

  addStep(step: Step) {

  }

  removeStep(step) {
    if(this.steps && step) {
      const index = this.steps.indexOf(step);
      if(index != -1) {
      	this.steps.splice(index, 1);
      }
    }
  }
}

export const PictureCreator = CompositeVisualization
