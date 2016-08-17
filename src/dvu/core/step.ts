import { Command } from './command'
import { Scope } from './scope'
import { ValueType } from './data/data_definition'
import { generateUUID } from '../utils/uuid'
import { Picture } from './models/picture'
import { StepSummary } from './step_summary'
import { Node } from '../dom/node'

export interface Executable<T> {
  execute(scope: Scope): T[]
}

export class Step implements Executable<Picture> {
  private _uuid: string = ''

  constructor(public command: Command, public data: Object, public parent: Executable = undefined) {
    this._uuid = generateUUID()
  }

  get uuid(): string {
    return this._uuid
  }

  addParameter(name: string, value: ValueType) {
    this.data[name] = value
  }

  isValid(): boolean {
    return this.command.validate(this.data)
  }

  getSummary(): StepSummary[] {
    // needs to refactor code
    const self = this,
      summaries: StepSummary[] = [].concat(this.command.getSummary(this.data))

    summaries.forEach((cur, index, array) => {
      if (cur.step === null) {
        array[index].step = self
      }
    })

    return summaries
  }

  execute(scope: Scope): Node[] {
    return [].concat(this.command.execute(this.data, scope))
  }
}
