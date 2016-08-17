import { Executable, Step } from './step'
import { StepSummary } from './step_summary'
import { generateUUID } from '../utils/uuid'
import { Scope } from '../core/scope'
import { Picture } from '../core/models/picture'
import { Node } from '../dom/node'

export class Block implements Executable<Node> {
  id: String = generateUUID()
  steps: Executable<any>[] = []

  constructor() { }

  add(step: Step) {
    step.parent = this
    this.steps.push(step)
  }

  remove(step: Step) {
    if (step.parent) {
      const index = this.steps.indexOf(step)
      if (index !== -1) {
        this.steps.splice(index, 1)
      } else {
        throw new Error('Cannot find step to be deleted in the block')
      }
    } else {
      throw new Error('Cannot delete an orphan step')
    }
  }

  clear() {
    this.steps = []
  }

  execute(scope: Scope): Node[] {
    return this.steps.reduce((elements, step) => elements.concat(step.execute(scope)), [])
  }

  executeUntil(count: number, scope: Scope): Node[] {
    return this.steps.slice(0, count).reduce((elements, step) => elements.concat(step.execute(scope)), [])
  }

  getSummary(data: Object): StepSummary[] {
    return this.steps.reduce((stepSummaries, step) => stepSummaries.concat(step.getSummary(data)), [])
  }
}
