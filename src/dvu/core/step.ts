import { Command } from './command'
import { Scope } from './scope'
import { ValueType } from './data/data_definition'
import { generateUUID } from '../utils/uuid'
import { Picture } from './models/picture'
import { StepSummary } from './stepSummary'

export interface Executable<T> {
  execute(scope: Scope): T[]
}

export class Step implements Executable<Picture> {
  private _uuid: string = ''

  constructor(public command: Command, public data: Object) {
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
      summaries: StepSummary[] = []
    summaries = summaries.concat(this.command.getSummary(this.data))
    summaries.forEach((cur, index, array) => {
      if (cur.step === null) {
        array[index].step = self
      }
    })
    return summaries
  }

  execute(scope: Scope): Picture[] {
    // return this.command.execute(this.data, scope)

    // temporary cloning the element node
    let result = [].concat(this.command.execute(this.data, scope))
    if (result) {
      result.forEach((item) => { item.element = item.element.cloneNode(true) })
      return result
    } else {
      return []
    }

  }
}
