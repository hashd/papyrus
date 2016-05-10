import {Command} from 'src/core/main/command'
import {CommandType} from 'src/core/enums/command_types'
import {PictureContext} from 'src/core/geometry/picture_context'
import {Picture} from 'src/core/main/models/picture'
import {DatasetDefinition} from 'src/core/main/data/dataset_definition'

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
