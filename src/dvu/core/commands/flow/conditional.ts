import { Command } from './../../command'
import { Scope } from './../../scope'
import { CommandType, COMMAND_TYPES } from './../../command_types'
import { DatasetDefinition } from './../../data/dataset_definition'
import { Block } from './../../block'
import { Picture } from '../../../core/models/picture'
import { StepSummary } from '../../step_summary'

const CONDITION: string = 'condition'

// TODO: Support multiple conditional clauses
const datasetDefinition = new DatasetDefinition()
datasetDefinition.addDataDefinition(CONDITION, 'boolean')

export class IfCommand extends Command {
  static commandName: string = 'If'
  static type: CommandType = COMMAND_TYPES.FLOW
  static shortcutKey: string = 'i'

  static datasetDefinition: DatasetDefinition = datasetDefinition
  trueBlock: Block = new Block()
  falseBlock: Block = new Block()

  constructor(data: Object) {
    super()
  }

  execute(data: Object, scope: Scope = new Scope()): Picture[] {
    if (!IfCommand.datasetDefinition.validate(data)) {
      return
    }

    const innerScope = new Scope(scope)
    const conditionValue: boolean = data[CONDITION]

    return conditionValue ? this.trueBlock.execute(innerScope) : this.falseBlock.execute(innerScope)
  }

  getSummary(data: Object): StepSummary[] {
    const trueBlock = new StepSummary(data, `if block`, this.trueBlock),
      falseBlock = new StepSummary(data, 'else block', this.falseBlock)

    return [ trueBlock, falseBlock ]
  }
}
