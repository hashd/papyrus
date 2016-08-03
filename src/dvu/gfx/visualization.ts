import { PictureCommand, PictureCommandInterface } from '../core/commands/picture'
import { Block } from '../core/block'
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
  block: Block = new Block()

  constructor() {
    super(this.name, this.getPictureCommandInterface())
  }

  execute(context: PictureContext, scope: Scope = new Scope()): Picture {
    const depth = scope.depth

    if (depth < 10) {
      const elements: Element[] = this.block.execute(scope).map(picture => picture.element)
      const group = SVG.createGroup(elements, this.dimensions.width, this.dimensions.height)
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

  executeUntil(count: number, context: PictureContext, scope: Scope = new Scope()): Picture {
    const elements: Element[] = this.block.executeUntil(count, scope).map(picture => picture.element)
    const group = SVG.createGroup(elements, this.dimensions.width, this.dimensions.height)

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
}

export const PictureCreator = CompositeVisualization
