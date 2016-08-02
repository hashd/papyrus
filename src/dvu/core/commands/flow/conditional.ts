import { Command } from './../../command'
import { Scope } from './../../scope'
import { CommandType } from './../../command_types'
import { DatasetDefinition } from './../../data/dataset_definition'
import { Block } from './../../block'
import { Picture } from '../../../core/models/picture'

const CONDITION: string = 'condition'

// TODO: Support multiple conditional clauses
const datasetDefinition = new DatasetDefinition()
datasetDefinition.addDataDefinition(CONDITION, 'boolean')

export class IfCommand extends Command {
  name: string = 'If'
  type: CommandType = 'flow'
  shortcutKey: string = 'i'
  
  datasetDefinition: DatasetDefinition = datasetDefinition
  trueBlock: Block = new Block()
  falseBlock: Block = new Block()

  constructor() {
    super()
  }

  execute(data, scope: Scope = new Scope()): Picture[] {
    if (!this.datasetDefinition.validate(data)) {
      return
    }

    const innerScope = new Scope(scope)
    const conditionValue: boolean = data[CONDITION]
    
    return conditionValue ? 
      this.trueBlock.execute(innerScope):
      this.falseBlock.execute(innerScope)
  }

  getSummary() {
    return 'Conditional Summary: Not implemented'
  }
}
