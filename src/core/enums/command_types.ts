export type PRIMITIVE = 'primitive'
export type COMPOSITE = 'composite'
export type ADJUST = 'adjust'
export type FLOW = 'flow'
export type MODIFIER = 'modifier'
export type GROUP = 'group'

export type CommandType = PRIMITIVE | COMPOSITE | ADJUST | FLOW | MODIFIER | GROUP

export const COMMAND_TYPES: CommandType[] = [
  PRIMITIVE,
  COMPOSITE,
  ADJUST,
  FLOW,
  MODIFIER,
  GROUP
]
