import { Step } from './step'
import { generateUUID } from '../utils/uuid'
import { Picture } from 'src/dvu/core/models/picture'

export class Block implements Executable {
  private _id: string
  private _steps: Executable[] = []

  constructor() {
    this._id = generateUUID()
  }

  get id(): string {
    return this._id
  }

  get steps(): Executable[] {
    return this._steps
  }

  add(step: Executable) {
    if(this._steps && step) {
      this._steps.push(step)
    }
  }

  remove(step: Executable) {
    if(this._steps && step) {
      const index = this._steps.indexOf(step);
      if(index != -1) {
      	this._steps.splice(index, 1);
      }
    }
  }

  clear() {
    this._steps = []
  }

  execute(scope: Scope): Picture[] {
    const elements: Picture[] = []
    this._steps.forEach(step => {
      elements = elements.concat(step.execute(scope))
    })
    return elements
  }
}
