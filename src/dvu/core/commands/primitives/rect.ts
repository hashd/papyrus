import { PictureContext } from '../../../geometry/picture_context'
import { SVG } from '../../../core/helpers/svg'
import { StepSummary } from '../../step_summary'
import { Scope } from '../../scope'
import { Command } from '../../command'
import { CommandType, COMMAND_TYPES } from '../../command_types'

export class RectCommand extends Command {
  static commandName: string = 'rect'
  static type: CommandType = COMMAND_TYPES.PRIMITIVE
  static shortcutKey: string = 'r'
  static noOfInstances: number = 0

  private _element: Element
  private _name: string

  constructor(context: PictureContext, scope: Scope = new Scope()) {
    super()

    this._name = `${RectCommand.commandName}-${++RectCommand.noOfInstances}`
    this._element = SVG.createRect(0, 0, 0, 0)
    if (context) {
      this.execute(context, scope)
    }
  }

  execute(context: PictureContext, scope: Scope = new Scope()): Picture {
    const initPoint = context.getLeastSignificantPoint(),
      endPoint = context.getMostSignificantPoint(),
      width = endPoint.x - initPoint.x,
      height = endPoint.y - initPoint.y

    this._element.setAttributeNS(null, 'x', initPoint.x.toString())
    this._element.setAttributeNS(null, 'y', initPoint.y.toString())
    this._element.setAttributeNS(null, 'width', width.toString())
    this._element.setAttributeNS(null, 'height', height.toString())

    return {
      name: context.name || `${this._name}`,
      element: this._element
    }
  }

  getSummary(data: Object): StepSummary {
    const initPoint = data.getLeastSignificantPoint(),
      summary = `Draw ${data.name || this._name} from (${initPoint.x}, ${initPoint.y}) with width: ${data.getWidth()} and height: ${data.getHeight()}`

    return new StepSummary(data, summary)
  }
})
