import {PictureCommand} from 'src/core/commands/picture'
import {PictureContext} from 'src/geometry/picture_context'
import {SVG} from 'src/core/helpers/svg'

export const Ellipsis = new PictureCommand({
  name: 'ellipsis',

  onMousedown(context: PictureContext): Element {
    const { start, end } = context

    return SVG.createEllipse(start.x, start.y, end.x - start.x, end.y - start.y)
  },

  onMousemove(element: Element, context: PictureContext): Element {
    const { start, end } = context
    const rx = end.x - start.x, ry = end.y - start.y

    element.setAttributeNS(null, 'rx', rx.toString())
    element.setAttributeNS(null, 'ry', ry.toString())

    return element
  },

  onMouseup(element: Element, context: PictureContext): Element {
    return this.onMousedown(element, context)
  }
})
