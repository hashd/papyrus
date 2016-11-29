import { CommandType } from './command_types'
import { Scope } from './scope'
import { Executable } from './step'
import { StepSummary } from './step_summary'
import { DatasetDefinition } from './data/dataset_definition'
import { Expression } from './../parser/expression'

export abstract class Command<T> {
  datasetDefinition: DatasetDefinition
  type: CommandType
  name: string

  validate(data: {}): boolean {
    return this.datasetDefinition.validate(data)
  }

  abstract execute(data, scope: Scope): T

  resolveExpressions(data, scope: Scope) {
    for (let key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key]
        if (value instanceof Expression) {
          scope.add(key, scope.resolve(value))
        }
      }
    }
  }

  getSummary(data: Object): StepSummary | StepSummary[]  {
    throw new Error('This method has not been overriden and should be done for all commands')
  }
}
