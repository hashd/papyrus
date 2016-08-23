import { Command } from './../../command'
import { Scope } from './../../scope'
import { CommandType, COMMAND_TYPES } from './../../command_types'
import { DatasetDefinition } from './../../data/dataset_definition'
import { Block } from './../../block'
import { StepSummary } from '../../step_summary'
import { Node } from '../../../dom/node'

const CONDITION: string = 'condition'

// TODO: Support multiple conditional clauses
const datasetDefinition = new DatasetDefinition()
datasetDefinition.addDataDefinition(CONDITION, 'boolean')

export class IfCommand extends Command<Element[]> {
  static commandName: string = 'If'
  static type: CommandType = COMMAND_TYPES.FLOW
  static shortcutKey: string = 'i'
  static datasetDefinition: DatasetDefinition = datasetDefinition

  trueBlock: Block<Element> = new Block<Element>()
  falseBlock: Block<Element> = new Block<Element>()

  constructor(data: Object) {
    super()
  }

  execute(data: Object, scope: Scope = new Scope()): Element[] {
    if (!IfCommand.datasetDefinition.validate(data)) {
      return
    }

    const innerScope = new Scope(scope)
    const conditionValue: boolean = true // #TODO: data[CONDITION]

    return conditionValue ? this.trueBlock.execute(innerScope) : this.falseBlock.execute(innerScope)
  }

  getSummary(data: Object): StepSummary[] {
    const trueBlock = new StepSummary(data, `if block`, this.trueBlock),
          falseBlock = new StepSummary(data, 'else block', this.falseBlock)

    return [ trueBlock, falseBlock ]
  }
}
