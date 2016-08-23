import {Element} from '../../models/element'
import {Command} from '../../core/command'
import {CommandType, COMMAND_TYPES} from '../command_types'
import {PictureContext} from '../../geometry/picture_context'
import {Scope} from './../scope'

export abstract class PictureCommand extends Command<Element> {
  constructor() {
    super()
  }

  abstract convertContext(context: PictureContext): Object

  abstract execute(data, scope: Scope): Element

  /**
   * Convert picture context into the data form and then execute
   *
   * @param context: Picture Context
   * @param scope: Scope to be executed within
   * @returns {Element}
   */
  executeWithPictureContext(context: PictureContext, scope: Scope): Element {
    return this.execute(this.convertContext(context), scope)
  }
}
