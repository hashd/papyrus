import { AdjustCommand, AdjustCommandInterface } from './adjust'
import { Picture } from '../../../models/picture'
import { PictureContext } from '../../../geometry/picture_context'

export const SCALE_COMMAND: AdjustCommand = new AdjustCommand({
  name: 'Scale',
  shortcutKey: 's',
  datasetDefinition: null,
  onDrag: function (picture: Picture, context: PictureContext): Picture {
    return picture.scale(context.start, context.end)
  },
  getSummary: function (picture: Picture, context: PictureContext): string {
    return `Scale ${picture.name} by (${context.end.x / context.start.x}, ${context.end.y / context.start.y})`
  }
})