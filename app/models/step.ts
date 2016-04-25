import { Command } from '../models'

interface Executable {
  execute(context: Object)
}

export class Step implements Executable {
  command: Command
  context: Object
  
  execute(context: Object) {
    this.context = context
  }
  
  getSummary() {
    
  }
}
