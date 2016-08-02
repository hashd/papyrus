import { Command } from './../../command'
import { Scope } from './../../scope'
import { CommandType } from './../../command_types'
import { DatasetDefinition } from './../../data/dataset_definition'
import { Block } from './../../block'
import { Range } from './../../../utils/range'
import { Picture } from 'src/dvu/core/models/picture'

const START: string = 'start'
const END: string = 'end'
const INDEX: string = 'index'

// Create dataset definition of a for loop within papyrus
// Loop currently only supports single index
// TODO: Support multiple index
const datasetDefinition = new DatasetDefinition()
datasetDefinition.addDataDefinition(START, 'number')
datasetDefinition.addDataDefinition(END, 'number')

export class ForCommand extends Command {
  name: string = 'For'
  type: CommandType = 'flow'
  shortcutKey: string = 'f'
  block: Block = new Block()
  datasetDefinition: DatasetDefinition = datasetDefinition

  constructor() {
    super()
  }

  execute(data, scope: Scope = new Scope()) {
    if (!this.datasetDefinition.validate(data)) {
      return
    }

    const innerScope = new Scope(scope)
    const begin = data[START]
    const end = data[END]

    Range.between(begin, end).forEach(i => {
      innerScope.add(INDEX, i)
      this.block.execute(innerScope)
    });
  }

  getSummary() {
    return 'Loop Summary: Not implemented'
  }
}
