import { Step, Executable } from './step'
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
    const elements: Picture[] = this._steps.reduce((acc, cur) => acc.concat(cur.execute(scope)), [])

    return elements
  }

  executeUntil(count: number, scope: Scope): Picture[] {
    const elements: Picture[] = [],
      steps: Executable[] = this._steps
    for (let index = 0; index < count && index < steps.length; index++) {
      elements = elements.concat(steps[index].execute(scope))
    }
    return elements
  }
}
