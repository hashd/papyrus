import { Command } from './../../command'
import { Scope } from './../../scope'
import { CommandType } from './../../command_types'
import { DatasetDefinition } from './../../data/dataset_definition'
import { Step } from './../../step'

const CONDITION: string = 'condition'

// TODO: Support multiple conditional clauses
const datasetDefinition = new DatasetDefinition()
datasetDefinition.addDataDefinition(CONDITION, 'boolean')

export class IfCommand extends Command {
  name: string = 'If'
  type: CommandType = 'flow'
  shortcutKey: string = 'i'
  trueBlock: Step[] = []
  falseBlock: Step[] = []
  datasetDefinition: DatasetDefinition = datasetDefinition

  constructor() {
    super()
  }

  execute(data, scope: Scope = new Scope()) {
    if (!this.datasetDefinition.validate(data)) {
      return
    }

    const innerScope = new Scope(scope)
    const conditionValue = data[CONDITION]

    if (conditionValue === true) {
      this.trueBlock.forEach(step => step.execute(innerScope))
    } else {
      this.falseBlock.forEach(step => step.execute(innerScope))
    }
  }
}
