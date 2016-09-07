import { Block } from '../../block'
import { Scope } from './../../scope'
import { DatasetDefinition } from '../../data/dataset_definition'
import { PictureContext } from '../../../geometry/picture_context'
import { CommandType, COMMAND_TYPES } from '../../command_types'
import { Dimensions } from '../../../geometry/dimensions'
import { StepSummary } from '../../step_summary'
import { Command } from '../../command'
import { PictureCommand } from '../picture'
import { Group } from './../../../models/group'
import { Element } from './../../../models/element'

export class CompositePicture extends PictureCommand {
  commandName: string = 'unnamed'
  type: CommandType = COMMAND_TYPES.COMPOSITE
  datasetDefinition: DatasetDefinition = new DatasetDefinition()
  dimensions: Dimensions = { width: 0, height: 0 }
  block: Block<Element> = new Block<Element>()
  instances: number = 0

  constructor() {
    super()
  }

  convertContext(context: PictureContext) {
    return {
      basePoint: context.getLeastSignificantPoint(),
      width: context.getWidth(),
      height: context.getHeight()
    }
  }

  execute(data = {}, scope: Scope = new Scope()): Element {
    this.instances++

    return new Group(`${this.commandName}-${this.instances}`, this.block.execute(scope))
  }

  executeUntil(count: number, context: PictureContext, scope: Scope = new Scope()): Element {
    return new Group(`${this.commandName}-preview-${count}`, this.block.executeUntil(count, scope))
  }

  getSummary(data: Object): StepSummary[] {
    return this.block.getSummary(data)
  }
}
