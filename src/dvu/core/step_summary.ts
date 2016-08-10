import { Executable } from './step'
import { Block } from './block'

export class StepSummary {
  constructor(public data: Object, public summary: string, public step: Executable = null) {
  }
}
