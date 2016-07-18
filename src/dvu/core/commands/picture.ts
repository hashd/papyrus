import {Command} from '../../core/command'
import {CommandType} from '../command_types'
import {PictureContext} from '../../geometry/picture_context'
import {Picture} from '../../core/models/picture'
import {DatasetDefinition} from '../../core/data/dataset_definition'
import {CommandInterface} from './command_interface'
import {Scope} from './../scope'

export interface PictureCommandInterface extends CommandInterface {
  name: string,
  shortcutKey: string,
  noOfInstances: number,
  onMousedown: (context: PictureContext) => Picture
  onMousemove: (element: Element, context: PictureContext) => Picture
  onMouseup: (element: Element, context: PictureContext) => Picture
  getSummary: (data: PictureContext) => string
}

export class PictureCommand extends Command {
  static noOfInstances: number = 0

  type: CommandType = 'primitive'
  defaultName: string = 'picture'
  datasetDefinition: DatasetDefinition = new DatasetDefinition()

  constructor(public name: string, private implementation: PictureCommandInterface) {
    super()
    this.shortcutKey = implementation.shortcutKey
  }

  execute(context: PictureContext, scope: Scope = new Scope()): Picture {
    return this.draw(context, scope.depth)
  }

  private draw(context: PictureContext, depth: number = 0): Picture {
    let element = this.implementation.onMousedown(context)

    if (!context.instanceCount) {
      this.implementation.noOfInstances = this.implementation.noOfInstances + 1
      context.instanceCount = this.implementation.noOfInstances
    }

    return {
      name: context.name || `${this.implementation.name}-${context.instanceCount}` || `${this.defaultName}-${context.instanceCount}`,
      element
    }
  }

  redraw(element: Element, context: PictureContext, depth: number = 0) {
    this.implementation.onMousemove(element, context)
  }

  getSummary(data: PictureContext) {
    return this.implementation.getSummary(data)
  }
}
