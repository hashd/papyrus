import { Command, DrawCommand } from '../models'

export class Step {
  secondaryContext
  
  constructor(public command: Command, public context) {
    this.secondaryContext = context
    
    switch (command.type) {
      case 'primitive':
      case 'composite':
        (<DrawCommand> command).onMouseDown(context.x, context.y)
        break;
      default:  
    }
  }
  
  modify(context) {
    this.secondaryContext = context
    switch (this.command.type) {
      case 'primitive':
      case 'composite':
        (<DrawCommand> this.command).onMouseMove(context.x, context.y)
        break;
      default:  
    }
  }
  
  end() {
    switch (this.command.type) {
      case 'primitive':
      case 'composite':
        (<DrawCommand> this.command).onMouseUp(this.secondaryContext.x, this.secondaryContext.y)
        break;
      default:  
    }
  }
  
  validate(): boolean {
    return this.command.validate()
  }
  
  getSummary() {
    return this.command.getSummary()
  }
}
