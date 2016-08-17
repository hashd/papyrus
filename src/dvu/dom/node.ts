import { Point } from '../geometry/cartesian_system'

const LINE = 'line'

export enum NodeTypes {
  LINE
}

export interface Node {
  type: NodeTypes,
  props: {[key: string]: string},
  children: Node[],
  showMagnets: boolean
  magnets: Point[],
}

export function node(type: NodeTypes, props: {[key: string]: string}, children: Node[] = [], magnets: Point[] = [], showMagnets: boolean = false): Node {
  return { type, props, children, showMagnets, magnets }
}
