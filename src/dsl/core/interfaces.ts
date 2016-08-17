import { Scope } from './scope'

export interface Executable<T> {
  execute: (scope: Scope) => T
}
