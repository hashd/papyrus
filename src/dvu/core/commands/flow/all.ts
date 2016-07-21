import { Command } from '../../command'
import { ForCommand } from './loop'
import { IfCommand } from './conditional'

export const forCommand = new ForCommand()
export const ifCommand = new IfCommand()

export const COMMANDS: Command[] = [forCommand, ifCommand]
