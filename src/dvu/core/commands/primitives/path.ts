import {PictureCommand} from 'src/dvu/core/commands/picture'
import {PictureContext} from 'src/dvu/geometry/picture_context'
import {SVG} from 'src/dvu/core/helpers/svg'

export const PATH = new PictureCommand('Path', {
  name: 'path',
  shortcutKey: 'p',
  noOfInstances: 0,

  onMousedown(context: PictureContext): Element {
    return SVG.createPath(context.points)
  },

  onMousemove(element: Element, context: PictureContext): Element {
    const { end } = context

    let d = element.getAttributeNS(null, 'd');

    element.setAttributeNS(null, 'd', `${d} L${end.x.toString()},${end.y.toString()}`)

    return element;
  },

  onMouseup(element: Element, context: PictureContext): Element {
    return this.onMousedown(element, context)
  },

  getSummary(data: PictureContext) {
    return `Draw ${data.name || (this.name + '-' + data.instanceCount)} from (${data.start.x}, ${data.start.y}) to (${data.end.x}, ${data.end.y})`
  }
})
