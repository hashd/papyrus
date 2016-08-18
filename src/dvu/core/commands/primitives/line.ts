import { PictureContext } from '../../../geometry/picture_context'
import { Line } from '../../../geometry/elements/line'
import { Node, node, NodeTypes } from '../../../dom/node'
import { StepSummary } from '../../step_summary'
import { Scope } from '../../scope'
import { Command } from '../../command'
import { CommandType, COMMAND_TYPES } from '../../command_types'
import { DatasetDefinition } from './../../data/dataset_definition'
import { DataType } from './../../data/data_definition'

const datasetDefinition = new DatasetDefinition()
datasetDefinition.addDataDefinition('x1', 'number')
datasetDefinition.addDataDefinition('y1', 'number')
datasetDefinition.addDataDefinition('x2', 'number')
datasetDefinition.addDataDefinition('y2', 'number')

export class LineCommand extends Command<Node> {
  static commandName: string = 'line'
  static type: CommandType = COMMAND_TYPES.PRIMITIVE
  static shortcutKey: string = 'l'
  static noOfInstances: number = 0
  static datasetDefinition = datasetDefinition

  private _element: Line
  private _name: string
  datasetDefinition = LineCommand.datasetDefinition

  constructor(context: PictureContext, scope: Scope = new Scope()) {
    super()
    this._name = `${LineCommand.commandName}-${++LineCommand.noOfInstances}`
    this._element = new Line(0, 0, 0, 0)
    if (context) {
      this.execute(context, scope)
    }
  }

  execute(context: PictureContext, scope: Scope = new Scope()): Node {
    const { start, end } = context,
          element = this._element

    element.setAttributes({
      x1: start.x.toString(),
      y1: start.y.toString(),
      x2: end.x.toString(),
      y2: end.y.toString()
    })

    return node(NodeTypes.LINE, element.attributes, [], element.magnets)
  }

  getSummary(data: Object): StepSummary {
    const summary: string = `Draw ${data.name || this._name} from (${data.start.x}, ${data.start.y}) to (${data.end.x}, ${data.end.y})`
    return new StepSummary(data, summary)
  }
}
