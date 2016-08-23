import { Executable, Step } from './step'
import { StepSummary } from './step_summary'
import { createID } from '../utils/uuid'
import { Scope } from '../core/scope'
import { Picture } from '../core/models/picture'
import { Node } from '../dom/node'

export class Block<T> implements Executable<T[]> {
  id: String = createID()
  steps: Executable<T>[] = []

  constructor() { }

  add(step: Step<T>) {
    step.parent = this
    this.steps.push(step)
  }

  remove(step: Step<T>) {
    const index = this.steps.indexOf(step)
    if (index !== -1) {
      this.steps.splice(index, 1)
    } else {
      throw new Error('Cannot find step to be deleted in the block')
    }
  }

  clear() {
    this.steps = []
  }

  execute(scope: Scope): T[] {
    return this.steps.reduce((elements: T[], step) => elements.concat(step.execute(scope)), [])
  }

  executeUntil(count: number, scope: Scope): T[] {
    return this.steps.slice(0, count).reduce((elements, step) => elements.concat(step.execute(scope)), [])
  }

  getSummary(data: Object): StepSummary[] {
    return this.steps.reduce((stepSummaries, step) => stepSummaries.concat(step.getSummary(data)), [])
  }
}
