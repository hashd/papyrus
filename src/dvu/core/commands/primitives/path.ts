import { PictureContext } from 'src/dvu/geometry/picture_context'
import { SVG } from 'src/dvu/core/helpers/svg'
import { StepSummary } from '../../step_summary'
import { Scope } from '../../scope'
import { Command } from '../../command'
import { CommandType, COMMAND_TYPES } from '../../command_types'

export class PathCommand extends Command {
  static commandName: string = 'path'
  static type: CommandType = COMMAND_TYPES.PRIMITIVE
  static shortcutKey: string = 'p'
  static noOfInstances: number = 0

  private _element: Element
  private _name: string

  constructor(context: PictureContext, scope: Scope = new Scope()) {
    super()
    this._name = `${PathCommand.commandName}-${++PathCommand.noOfInstances}`

    this._element = SVG.createPath([])
    if (context) {
      this.execute(context, scope)
    }
  }

  execute(context: PictureContext, scope: Scope = new Scope()): Picture {
    const { end } = context,
      d = this._element.getAttributeNS(null, 'd')

    if (d) {
      this._element.setAttributeNS(null, 'd', `${d} L${end.x.toString()},${end.y.toString()}`)
    } else {
      this._element.setAttributeNS(null, 'd', `M${end.x.toString()},${end.y.toString()}`)
    }

    return {
      name: context.name || `${this._name}`,
      element: this._element
    }
  }

  getSummary(data: Object): StepSummary {
    const summary = `Draw ${data.name || this._name} from (${data.start.x}, ${data.start.y}) to (${data.end.x}, ${data.end.y})`

    return new StepSummary(data, summary)
  }
}
