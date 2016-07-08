import {Command} from './command'
import {Scope} from './scope'
import {ValueType} from './data/data_definition'

export class Step {
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

  execute(scope: Scope) {
    return this.command.execute(this.data, scope)
  }
}
