import {Command} from './command'
import {Scope} from './scope'
import {ValueType} from './data/data_definition'

export class Step {
  private _uuid: string = ''

  constructor(public command: Command, public data: Object) {
    this._uuid = Math.random().toString(36).substr(2, 16)
  }

  get uuid(): string {
    return this._uuid;
  }

  addParameter(name: string, value: ValueType) {
    this.data[name] = value
  }

  isValid(): boolean {
    return this.command.validate(this.data)
  }

  getSummary() {
    return this.command.getSummary(this.data)
  }

  execute(scope: Scope) {
    return this.command.execute(this.data, scope)
  }
}
