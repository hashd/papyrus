import { Executable } from './step'
import { StepSummary } from './step_summary'
import { generateUUID } from '../utils/uuid'
import { Scope } from '../core/scope'
import { Picture } from '../core/models/picture'

export class Block implements Executable<Picture> {
  private _id: string
  private _steps: Executable<any>[] = []

  constructor() {
    this._id = generateUUID()
  }

  get id(): string {
    return this._id
  }

  get steps(): Executable<any>[] {
    return this._steps
  }

  add(step: Executable<any>) {
    if (this._steps && step) {
      this._steps.push(step)
    }
  }

  remove(step: Executable<any>) {
    if (this._steps && step) {
      const index = this._steps.indexOf(step)
      if (index !== -1) {
        this._steps.splice(index, 1)
      }
    }
  }

  clear() {
    this._steps = []
  }

  execute(scope: Scope): Picture[] {
    if (this._steps && this._steps.length > 0) {
      return this._steps.reduce((pictures, step) => pictures.concat(step.execute(scope)), [])
    } else {
      return []
    }
  }

  executeUntil(count: number, scope: Scope): Picture[] {
    return this._steps.slice(0, count).reduce((pictures, step) => pictures.concat(step.execute(scope)), [])
  }

  getSummary(data: Object): StepSummary[] {
    return this._steps.reduce((stepSummaries, step) => stepSummaries.concat(step.getSummary(data)), [])
  }
}
