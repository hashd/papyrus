import { Command } from '../command'
import { COMMANDS as PRIMITIVES } from './primitives/all'
import { COMMANDS as FLOW } from './flow/all'

export const COMMANDS: Command[] = [...PRIMITIVES, ...FLOW]
