import {Command} from '../../core/command'
import {CommandType} from '../../enums/command_types'
import {PictureContext} from '../../geometry/picture_context'
import {Picture} from '../../core/models/picture'
import {DatasetDefinition} from '../../core/data/dataset_definition'
import {CommandInterface} from 'src/dvu/core/commands/command_interface'

export interface PictureCommandInterface extends CommandInterface {
  name: string,
  noOfInstances: number,
  onMousedown: (context: PictureContext) => Element
  onMousemove: (element: Element, context: PictureContext) => Element
  onMouseup: (element: Element, context: PictureContext) => Element
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

  execute(context: PictureContext, depth: number = 0): Picture {
    let element = this.implementation.onMousedown(context)

    if (!context.instanceCount) {
      console.log(context.instanceCount, this.implementation.noOfInstances)

      this.implementation.noOfInstances = this.implementation.noOfInstances + 1
      context.instanceCount = this.implementation.noOfInstances
    }

    return {
      name: context.name || `${this.implementation.name}-${context.instanceCount}` || `${this.defaultName}-${context.instanceCount}`,
      element
    }
  }

  getSummary(data: PictureContext) {
    return this.implementation.getSummary(data)
  }
}
