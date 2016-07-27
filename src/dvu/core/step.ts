import {Command} from './command'
import {Scope} from './scope'
import {ValueType} from './data/data_definition'

export class Step {
  private element: Element

  constructor(public command: Command, public data: Object) {

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

  getElement() {
    return this.element
  }

  execute(scope: Scope) {
    let result = this.command.execute(this.data, scope)
    this.element = result.element
    return result
  }
}
