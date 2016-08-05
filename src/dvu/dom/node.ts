export interface Node {
  type: string,
  props: {[key: string]: string},
  children: Node[]
}

export function node(type: string, props: {[key: string]: string}, children: Node[]): Node {
  return { type, props, children }
}
