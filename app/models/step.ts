import { Command } from '../models'

interface Executable {
  execute()
}

export class Step implements Executable {
  secondaryContext: Object
  
  constructor(public command, public context: Object) {
    this.secondaryContext = context
  }
  
  execute() {
  }
  
  modify(context: Object) {
    this.secondaryContext = context
  }
  
  end() {
    this.execute()
  }
  
  getSummary() {
    return `Draw ${this.command.name} from (${this.context.x}, ${this.context.y}) to (${this.secondaryContext.x}, ${this.secondaryContext.y})`
  }
}
