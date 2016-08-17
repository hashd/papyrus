import {Command} from './../../command'
import {CommandType} from './../../command_types'
import {PictureContext} from '../../../geometry/picture_context'
import {Scope} from '../../scope'
import {Node} from './../../../dom/node'
import {DatasetDefinition} from '../../data/dataset_definition'

const adjustDatasetDefinition = new DatasetDefinition()

export class AdjustCommand extends Command<Node> {
  type: CommandType = 'adjust'
  initEvent: string = 'mousedown'
  datasetDefinition: DatasetDefinition = adjustDatasetDefinition

  constructor() {
    super()
  }

  execute(data, scope: Scope = new Scope()): Node {
    // Stub
    return null
  }
}
