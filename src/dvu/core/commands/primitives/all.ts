import { Command } from 'src/dvu/core/command'
import { ELLIPSIS } from 'src/dvu/core/commands/primitives/ellipsis'
import { LINE } from 'src/dvu/core/commands/primitives/line'
import { RECT } from 'src/dvu/core/commands/primitives/rect'
import { PATH } from 'src/dvu/core/commands/primitives/path'

export const COMMANDS: Command[] = [LINE, RECT, ELLIPSIS, PATH]
