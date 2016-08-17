import { PictureContext } from '../../../geometry/picture_context'
import { SVG } from '../../../core/helpers/svg'
import { StepSummary } from '../../step_summary'
import { Scope } from '../../scope'
import { Command } from '../../command'
import { CommandType, COMMAND_TYPES } from '../../command_types'

export class EllipsisCommand extends Command {
  static commandName: string = 'ellipsis'
  static type: CommandType = COMMAND_TYPES.PRIMITIVE
  static shortcutKey: string = 'e'
  static noOfInstances: number = 0

  private _element: Element
  private _name: string

  constructor(context: PictureContext, scope: Scope = new Scope()) {
    this._name = `${EllipsisCommand.commandName}-${++EllipsisCommand.noOfInstances}`

    this._element = SVG.createEllipse(0, 0, 0, 0)
    if (context) {
      this.execute(context, scope)
    }
  }

  execute(context: PictureContext, scope: Scope = new Scope()): Picture {
    const { start } = context,
      rx = context.getWidth(),
      ry = context.getHeight()

    this._element.setAttributeNS(null, 'cx', start.x)
    this._element.setAttributeNS(null, 'cy', start.y)
    this._element.setAttributeNS(null, 'rx', rx.toString())
    this._element.setAttributeNS(null, 'ry', ry.toString())

    return {
      name: context.name || `${this._name}`,
      element: this._element
    }
  }

  getSummary(data: Object): StepSummary {
    const radius = (data.getWidth() === data.getHeight()) ? data.getWidth() : `${data.getWidth()}, ${data.getHeight()}`,
      summary = `Draw ${data.name || ((data.getWidth() === data.getHeight()) ? 'circle' : 'ellipsis') + '-' + data.instanceCount} from (${data.start.x}, ${data.start.y}) with radius: ${radius}`

    return new StepSummary(data, summary)
  }
}
