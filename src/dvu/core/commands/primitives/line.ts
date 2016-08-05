import {PictureCommand} from '../../../core/commands/picture'
import {PictureContext} from '../../../geometry/picture_context'
import {SVG} from '../../../core/helpers/svg'
import {DatasetDefinition} from '../../data/dataset_definition'
import {MeasuresDefinition} from '../../data/measures_definition'

export const LINE_DATASET_DEFINITION = new DatasetDefinition()
LINE_DATASET_DEFINITION.addDataDefinition('x1', 'number', 0)
LINE_DATASET_DEFINITION.addDataDefinition('y1', 'number', 0)
LINE_DATASET_DEFINITION.addDataDefinition('x2', 'number', 0)
LINE_DATASET_DEFINITION.addDataDefinition('y2', 'number', 0)

export const LINE_MEASURES_DEFINITION = new MeasuresDefinition()
LINE_MEASURES_DEFINITION.addMeasureDefinition('stroke', 'color', '#000')
LINE_MEASURES_DEFINITION.addMeasureDefinition('stroke-width', 'length', '1px')

export const LINE = new PictureCommand('Line', {
  name: 'line',
  shortcutKey: 'l',
  noOfInstances: 0,
  datasetDefinition: LINE_DATASET_DEFINITION,
  measuresDefinition: LINE_MEASURES_DEFINITION,

  draw(data, measures = LINE_MEASURES_DEFINITION.getDefaultMeasures()): Element {
    return SVG.createLine(data.x1, data.y1, data.x2, data.y2, measures)
  },
  
  onMousedown(context: PictureContext): Element {
    const { start, end } = context,
          defaultMeasures = LINE_MEASURES_DEFINITION.getDefaultMeasures()

    return SVG.createLine(start.x, start.y, end.x, end.y, defaultMeasures)
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

  getDataFromContext(ctx: PictureContext) {
    const { start: {x: x1, y: y1}, end: {x: x2, y: y2}} = ctx
    
    return { x1, x2, y1, y2 }
  },

  getSummary(data) {
    return `Draw ${data.name || (this.name + '-' + data.instanceCount)} from (${data.start.x}, ${data.start.y}) to (${data.end.x}, ${data.end.y})`
  }
})
