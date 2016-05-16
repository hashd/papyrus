import {PictureCommand} from 'src/dvu/core/commands/picture'
import {PictureContext} from 'src/dvu/geometry/picture_context'
import {SVG} from 'src/dvu/core/helpers/svg'

export const RECT = new PictureCommand('Rect', {
  name: 'rect',
  shortcutKey: 'x',

  onMousedown(context: PictureContext): Element {
    const initPoint = context.getLeastSignificantPoint(),
      endPoint = context.getMostSignificantPoint()

    return SVG.createRect(initPoint.x, initPoint.y, endPoint.x - initPoint.x, endPoint.y - initPoint.y)
  },

  onMousemove(element: Element, context: PictureContext): Element {
    const initPoint = context.getLeastSignificantPoint(),
      endPoint = context.getMostSignificantPoint(),
      width = endPoint.x - initPoint.x,
      height = endPoint.y - initPoint.y

    element.setAttributeNS(null, 'x', initPoint.x.toString())
    element.setAttributeNS(null, 'y', initPoint.y.toString())
    element.setAttributeNS(null, 'width', width.toString())
    element.setAttributeNS(null, 'height', height.toString())

    return element
  },

  onMouseup(element: Element, context: PictureContext): Element {
    return this.onMousedown(element, context)
  }
})
