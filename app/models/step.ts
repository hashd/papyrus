import { Command } from '../models'

interface Executable {
  execute()
}

export class Step implements Executable {
  command: Command
  
  execute() {
    
  }
}
