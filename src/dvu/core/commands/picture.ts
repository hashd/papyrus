import {Command} from '../../core/command'
import {CommandType} from '../../enums/command_types'
import {PictureContext} from '../../geometry/picture_context'
import {Picture} from '../../core/models/picture'
import {DatasetDefinition} from '../../core/data/dataset_definition'
import {CommandInterface} from 'src/dvu/core/commands/command_interface'

export interface PictureCommandInterface extends CommandInterface {
  onMousedown: (context: PictureContext) => Element
  onMousemove: (element: Element, context: PictureContext) => Element
  onMouseup: (element: Element, context: PictureContext) => Element
}

export class PictureCommand extends Command {
  type: CommandType = 'primitive'
  defaultName: string = 'picture'
  datasetDefinition: DatasetDefinition = new DatasetDefinition()

  constructor(public name: string, private implementation: PictureCommandInterface) {
    super()
    this.shortcutKey = implementation.shortcutKey
  }

  execute(context: PictureContext): Picture {
    let element = this.implementation.onMousedown(context)

    return {
      name: this.implementation.name || this.defaultName,
      element
    }
  }
}
