const FLOW: CommandType = 'flow'
const PRIMITIVE: CommandType = 'primitive'
const COMPOSITE: CommandType = 'composite'
const ADJUST: CommandType = 'adjust'
// const MODIFIER: string = 'modifier'
// const GROUP: string = 'group'

export type CommandType = 'primitive' | 'composite' | 'adjust' | 'flow' | 'modifier' | 'group'

export const COMMAND_TYPES = {
  PRIMITIVE,
  COMPOSITE,
  FLOW,
  ADJUST
}
