import { Command } from '../models'

interface Executable {
  execute(context: Object)
}

export class Step implements Executable {
  constructor(public command: Command, public context: Object) {}
  
  execute(context: Object) {
    this.context = context
  }
  
  getSummary() {
    
  }
}
