import { MOVE_COMMAND } from './move'
import { ROTATE_COMMAND } from './rotate'
import { SCALE_COMMAND } from './scale'
import { CLONE_COMMAND } from './clone'
import { Command } from '../../command'

export { MOVE_COMMAND, ROTATE_COMMAND, SCALE_COMMAND, CLONE_COMMAND }

export const COMMANDS: Command[] = [ MOVE_COMMAND, ROTATE_COMMAND, SCALE_COMMAND, CLONE_COMMAND ]
