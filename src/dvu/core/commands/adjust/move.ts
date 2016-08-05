import { AdjustCommand } from './adjust'
import { Picture } from '../../../models/picture'
import { PictureContext } from '../../../geometry/picture_context'

export const MOVE_COMMAND: AdjustCommand = new AdjustCommand({
  name: 'Move',
  shortcutKey: 'm',
  datasetDefinition: null,
  onDrag: function (picture: Picture, context: PictureContext): Picture {
    return picture.move(context.start, context.end)
  },
  getSummary: function (picture: Picture, context: PictureContext): string {
    return `Move ${picture.name} by (${context.end.x - context.start.x}, ${context.end.y - context.start.y})`
  }
})
