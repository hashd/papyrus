import { Command } from './command'
import { Scope } from './scope'
import { ValueType } from './data/data_definition'
import { createID } from '../utils/uuid'
import { Picture } from './models/picture'
import { StepSummary } from './step_summary'
import { Node } from '../dom/node'
import { Executable } from './interfaces'

export interface Executable<T> {
  execute(scope: Scope): T
}

export class Step<T> implements Executable<T> {
  id: string = createID()

  constructor(public command: Command<T>,
              public data: {[key: string]: ValueType},
              public parent: Executable<any> = null) {
  }

  execute(scope: Scope): T {
    return this.command.execute(this.data, scope)
  }

  addParameter(name: string, value: ValueType) {
    this.data[name] = value
  }

  isValid(): boolean {
    return this.command.validate(this.data)
  }

  getSummary(): StepSummary[] {
    // needs to refactor code
    const summaries: StepSummary[] = [].concat(this.command.getSummary(this.data))

    summaries.forEach((cur, index, array) => {
      if (cur.step === null) {
        array[index].step = this
      }
    })

    return summaries
  }
}
