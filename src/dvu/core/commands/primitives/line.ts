import {PictureCommand} from 'src/dvu/core/commands/picture'
import {PictureContext} from 'src/dvu/geometry/picture_context'
import {SVG} from 'src/dvu/core/helpers/svg'

export const LINE = new PictureCommand('Line', {
  name: 'line',
  shortcutKey: 'l',
  noOfInstances: 0,

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
  },

  getSummary(data: PictureContext) {
    return `Draw ${data.name || (this.name + '-' + data.instanceCount)} from (${data.start.x}, ${data.start.y}) to (${data.end.x}, ${data.end.y})`
  }
})
