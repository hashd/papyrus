import { Command } from './../../command'
import { Scope } from './../../scope'
import { CommandType } from './../../command_types'
import { DatasetDefinition } from './../../data/dataset_definition'
import { Block } from './../../block'
import { Picture } from 'src/dvu/core/models/picture'

const CONDITION: string = 'condition'

// TODO: Support multiple conditional clauses
const datasetDefinition = new DatasetDefinition()
datasetDefinition.addDataDefinition(CONDITION, 'boolean')

export class IfCommand extends Command {
  name: string = 'If'
  type: CommandType = 'flow'
  shortcutKey: string = 'i'
  trueBlock: Block = new Block()
  falseBlock: Block = new Block()
  datasetDefinition: DatasetDefinition = datasetDefinition

  constructor() {
    super()
  }

  execute(data, scope: Scope = new Scope()): Picture[] {
    if (!this.datasetDefinition.validate(data)) {
      return
    }

    const innerScope = new Scope(scope)
    const conditionValue = data[CONDITION]
    const pictures: Picture[] = []
    const block: Block = conditionValue === true ? this.trueBlock : this.falseBlock

    return block.execute(innerScope)
  }

  getSummary() {
    return 'Conditional Summary: Not implemented'
  }
}
