import {Command} from './../../command'
import {CommandInterface} from './../command_interface'
import {CommandType} from './../../command_types'
import {PictureContext} from '../../../geometry/picture_context'
import {Picture} from '../../../models/picture'
import {Scope} from '../../scope'
import {DatasetDefinition} from '../../data/dataset_definition'

const adjustDatasetDefinition = new DatasetDefinition()

export interface AdjustCommandInterface extends CommandInterface {
  shortcutKey: string
  datasetDefinition?: DatasetDefinition
  onDrag: (picture: Picture, context: PictureContext) => Picture
  getSummary: (picture: Picture, data: PictureContext) => string
}

export class AdjustCommand extends Command {
  type: CommandType = 'adjust'
  initEvent: string = 'mousedown'
  datasetDefinition: DatasetDefinition = adjustDatasetDefinition
  
  constructor(private implementation: AdjustCommandInterface) {
    super()
    this.name = implementation.name
    this.shortcutKey = implementation.shortcutKey
    
    if (implementation.datasetDefinition) {
      this.datasetDefinition = implementation.datasetDefinition
    }
  }

  execute(data, scope: Scope = new Scope()): Picture {
    const picture: Picture = data.picture,
          pictureContext: PictureContext = data.context

    return this.implementation.onDrag(picture, pictureContext)
  }
}
