import { Command } from './../../command'
import { Scope } from './../../scope'
import { CommandType, COMMAND_TYPES } from './../../command_types'
import { DatasetDefinition } from './../../data/dataset_definition'
import { Block } from './../../block'
import { Range } from './../../../utils/range'
import { Picture } from '../../../core/models/picture'
import { StepSummary } from '../../step_summary'

const START: string = 'start'
const END: string = 'end'
const INDEX: string = 'index'

// Create dataset definition of a for loop within papyrus
// Loop currently only supports single index
// TODO: Support multiple index
const datasetDefinition = new DatasetDefinition()
datasetDefinition.addDataDefinition(START, 'number')
datasetDefinition.addDataDefinition(END, 'number')

export class ForCommand extends Command<Element[]> {
  static name: string = 'For'
  static type: CommandType = COMMAND_TYPES.FLOW
  static datasetDefinition: DatasetDefinition = datasetDefinition
  static shortcutKey: string = 'f'

  block: Block<Element> = new Block<Element>()

  constructor() {
    super()
  }

  execute(data, scope: Scope = new Scope()): Element[] {
    if (!this.datasetDefinition.validate(data)) {
      return
    }

    const innerScope = new Scope(scope)
    const begin = data[START]
    const end = data[END]

    Range.between(begin, end).forEach(i => {
      innerScope.add(INDEX, i)
      this.block.execute(innerScope)
    })
  }

  getSummary(data: Object): StepSummary {
    return new StepSummary(data, 'For', this.block)
  }
}
