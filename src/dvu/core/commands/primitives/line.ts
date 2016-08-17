import { PictureContext } from 'src/dvu/geometry/picture_context'
import { SVG } from 'src/dvu/core/helpers/svg'
import { StepSummary } from '../../step_summary'
import { Scope } from '../../scope'
import { Command } from '../../command'
import { CommandType, COMMAND_TYPES } from '../../command_types'

export class LineCommand extends Command {
  static commandName: string = 'line'
  static type: CommandType = COMMAND_TYPES.PRIMITIVE
  static shortcutKey: string = 'l'
  static noOfInstances: number = 0

  private _element: Element
  private _name: string

  constructor(context: PictureContext, scope: Scope = new Scope()) {
    this._name = `${LineCommand.commandName}-${++LineCommand.noOfInstances}`

    this._element = SVG.createLine(0, 0, 0, 0)
    if (context) {
      this.execute(context, scope)
    }
  }

  execute(context: PictureContext, scope: Scope = new Scope()): Picture {
    const { start, end } = context

    this._element.setAttributeNS(null, 'x1', start.x.toString())
    this._element.setAttributeNS(null, 'y1', start.y.toString())
    this._element.setAttributeNS(null, 'x2', end.x.toString())
    this._element.setAttributeNS(null, 'y2', end.y.toString())

    return {
      name: context.name || `${this._name}`,
      element: this._element
    }
  }

  getSummary(data: Object): StepSummary {
    const summary: string = `Draw ${data.name || this._name} from (${data.start.x}, ${data.start.y}) to (${data.end.x}, ${data.end.y})`
    return new StepSummary(data, summary)
  }
}
