import { Block } from '../core/block'
import { Scope } from './../core/scope'
import { DatasetDefinition } from '../core/data/dataset_definition'
import { PictureContext } from '../geometry/picture_context'
import { CommandType, COMMAND_TYPES } from '../core/command_types'
import { Dimensions } from '../geometry/dimensions'
import { StepSummary } from '../core/step_summary'
import { Command } from '../core/command'
import { Node } from '../dom/node'

export class CompositeVisualization extends Command {
  commandName: string = 'unnamed'
  type: CommandType = COMMAND_TYPES.COMPOSITE
  datasetDefinition: DatasetDefinition = new DatasetDefinition()
  dimensions: Dimensions = { width: 0, height: 0 }
  block: Block = new Block()

  constructor() {
    super()
  }

  execute(context: PictureContext, scope: Scope = new Scope()): Node[] {
    return this.block.execute(scope)
  }

  executeUntil(count: number, context: PictureContext, scope: Scope = new Scope()): Node[] {
    return this.block.executeUntil(count, scope)
  }

  getSummary(data: Object): StepSummary[] {
    return this.block.getSummary(data)
  }
}
