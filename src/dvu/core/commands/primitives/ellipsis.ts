import {PictureCommand} from 'src/dvu/core/commands/picture'
import {PictureContext} from 'src/dvu/geometry/picture_context'
import {SVG} from 'src/dvu/core/helpers/svg'

export const ELLIPSIS = new PictureCommand('Circle', {
  name: 'circle',
  shortcutKey: 'c',
  noOfInstances: 0,

  onMousedown(context: PictureContext): Element {
    const { start, end } = context

    const ellipsis = SVG.createEllipse(start.x, start.y, context.getWidth(), context.getHeight())
    ellipsis.setAttributeNS(null, 'stroke', '#555')
    ellipsis.setAttributeNS(null, 'fill', 'transparent')

    return ellipsis
  },

  onMousemove(element: Element, context: PictureContext): Element {
    const { start, end } = context
    const rx = context.getWidth(), ry = context.getHeight()

    element.setAttributeNS(null, 'rx', rx.toString())
    element.setAttributeNS(null, 'ry', ry.toString())

    return element
  },

  onMouseup(element: Element, context: PictureContext): Element {
    return this.onMousedown(element, context)
  },

  getSummary(data: PictureContext) {
    const radius = (data.getWidth() == data.getHeight()) ? data.getWidth(): `${data.getWidth()}, ${data.getHeight()}`
    return `Draw ${data.name || ((data.getWidth() == data.getHeight())?'circle': 'ellipsis') + '-' + data.instanceCount} from (${data.start.x}, ${data.start.y}) with radius: ${radius}`
  }
})
