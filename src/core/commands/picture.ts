import {Command} from 'src/core/command'
import {CommandType} from 'src/enums/command_types'
import {PictureContext} from '../../geometry/picture_context'
import {Picture} from 'src/core/models/picture'
import {DatasetDefinition} from 'src/core/data/dataset_definition'

export interface PictureCommandInterface {
  name: string
  onMousedown: (context: PictureContext) => Element
  onMousemove: (element: Element, context: PictureContext) => Element
  onMouseup: (element: Element, context: PictureContext) => Element
}

export class PictureCommand extends Command {
  type: CommandType = 'primitive'
  defaultName: string = 'picture'
  datasetDefinition: DatasetDefinition = new DatasetDefinition()

  constructor(private implementation: PictureCommandInterface) {
    super()
  }

  execute(context: PictureContext): Picture {
    let element = this.implementation.onMousedown(context)
    element = this.implementation.onMouseup(element, context)

    return {
      name: this.implementation.name || this.defaultName,
      element
    }
  }
}
