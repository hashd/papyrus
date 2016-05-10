import {PictureContext} from 'src/core/geometry/picture_context'
import {PictureCommand} from 'src/core/main/commands/picture'
import {SVG} from 'src/core/main/helpers/svg'

export const LINE = new PictureCommand({
  name: 'line',
  
  onMousedown(context: PictureContext): Element {
    const { start, end } = context

    return SVG.createLine(start.x, start.y, end.x, end.y)
  },

  onMousemove(element: Element, context: PictureContext): Element {
    const { end } = context

    element.setAttributeNS(null, 'x2', end.x.toString())
    element.setAttributeNS(null, 'y2', end.y.toString())

    return element
  },

  onMouseup(element: Element, context: PictureContext): Element {
    return this.onMousedown(element, context)
  }
})
