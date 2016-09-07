import { NodeTypes, Node } from '../../dom/node'
import { Group } from '../../models/group'
import { SVG } from './helper'

export function convertObjectModelToSVG(group: Group, height: number, width: number, viewBox: string) {
  const svg = SVG.createSVG(height, width, viewBox)

  if (group) {
    group.children.forEach((node: Node) => {
      if (node) {
        switch (node.type) {
          case NodeTypes.LINE:
            const line = SVG.createLine(parseInt(node.props['x1']), parseInt(node.props['y1']), parseInt(node.props['x2']), parseInt(node.props['y2']), node.magnets)
            svg.appendChild(line)
            break
          default:
            // no op
            break
        }
      }
    })
  }

  return svg
}
