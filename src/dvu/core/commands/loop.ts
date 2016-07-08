import { Command } from './../command'
import { Scope } from './../scope'
import { CommandType } from './../../enums/command_types'
import { DatasetDefinition } from './../data/dataset_definition'
import { Step } from './../step'

const datasetDefinition = new DatasetDefinition()
datasetDefinition.addDataDefinition('start', 'number')
datasetDefinition.addDataDefinition('end', 'number')

export class ForCommand extends Command {
  type: CommandType = 'flow'
  shortcutKey: string = 'l'
  steps: Step[] = []
  datasetDefinition: DatasetDefinition = datasetDefinition

  constructor() {
    super()
  }

  execute(data, scope: Scope = new Scope()) {
    const currScope = new Scope(scope)
    if (this.datasetDefinition.validate(data)) {
      for (let i = data['start']; i < data['end']; i++) {
        currScope.add('index', i)
        this.steps.forEach((step, idx) => {
          step.execute(currScope)
        })
      }
    }
  }
}