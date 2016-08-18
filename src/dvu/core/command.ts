import { CommandType } from './command_types'
import { Scope } from './scope'
import { Executable } from './step'
import { StepSummary } from './step_summary'
import { DatasetDefinition } from './data/dataset_definition'

export abstract class Command<T> {
  datasetDefinition: DatasetDefinition

  validate(data: {}): boolean {
    return this.datasetDefinition.validate(data)
  }

  abstract execute(data, scope: Scope): T

  getSummary(data: Object): StepSummary | StepSummary[]  {
    return new StepSummary({}, 'This method has not been overriden and should be done for all commands')
  }
}
