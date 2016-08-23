const FLOW: string = 'flow'
const PRIMITIVE: string = 'primitive'
const COMPOSITE: string = 'composite'
const ADJUST: string = 'adjust'
// const MODIFIER: string = 'modifier'
// const GROUP: string = 'group'

export type CommandType = PRIMITIVE | COMPOSITE | ADJUST | FLOW | MODIFIER | GROUP

export const enum COMMAND_TYPES {
  PRIMITIVE,
  COMPOSITE,
  FLOW,
  ADJUST
}
