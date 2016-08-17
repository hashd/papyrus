import { PictureContext } from '../../../geometry/picture_context'
import { Element } from '../../../models/element'
import { Line } from '../../../models/line'
import { Node, node, NodeTypes } from '../../../dom/node'
import { StepSummary } from '../../step_summary'
import { Scope } from '../../scope'
import { Command } from '../../command'
import { PictureCommand } from '../picture'
import { CommandType, COMMAND_TYPES } from '../../command_types'
import { DatasetDefinition } from './../../data/dataset_definition'
import { DataType } from './../../data/data_definition'
import { LINE_DEFINITION } from './../definitions/line_definition'
import { Expression } from '../../../parser/expression'

export class LineCommand extends PictureCommand {
  static commandName: string = 'line'
  static type: CommandType = COMMAND_TYPES.PRIMITIVE
  static shortcutKey: string = 'l'
  static noOfInstances: number = 0

  datasetDefinition = LINE_DEFINITION

  constructor() {
    super()
  }

  execute(data, scope: Scope = new Scope()): Element {
    // Resolve expressions to values and add to scope
    this.resolveExpressions(data, scope)

    // If data passed doesn't satisfy the type information return 
    if (this.datasetDefinition.validate(data) !== true) {
      throw new Error('Arguments passed are not as expected.')
    }

    return new Line(data.name || `${LineCommand.commandName}-${LineCommand.noOfInstances}`, data.x1, data.y1, data.x2, data.y2)
  }

  convertContext(context: PictureContext): Object {
    return {
      x1: context.start.x,
      x2: context.end.x,
      y1: context.start.y,
      y2: context.start.x
    }
  }

  getSummary(data: Object): StepSummary {
    const summary: string = `Draw ${data.name || this._name} from (${data.start.x}, ${data.start.y}) to (${data.end.x}, ${data.end.y})`
    return new StepSummary(data, summary)
  }
}
