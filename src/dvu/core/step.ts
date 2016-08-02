import { Command } from './command'
import { Scope } from './scope'
import { ValueType } from './data/data_definition'
import { generateUUID } from '../utils/uuid'
import { Picture } from './models/picture'

export interface Executable<T> {
  execute(scope: Scope): T[]
}

export class Step implements Executable<Picture> {
  private _uuid: string = ''

  constructor(public command: Command, public data: Object) {
    this._uuid = generateUUID()
  }

  get uuid(): string {
    return this._uuid;
  }

  addParameter(name: string, value: ValueType) {
    this.data[name] = value
  }

  isValid(): boolean {
    return this.command.validate(this.data)
  }

  getSummary() {
    return this.command.getSummary(this.data)
  }

  execute(scope: Scope): Picture[] {
    return this.command.execute(this.data, scope)
  }
}
