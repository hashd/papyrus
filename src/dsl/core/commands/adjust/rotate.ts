import { AdjustCommand } from './adjust'
import { Picture } from '../../../models/picture'
import { PictureContext } from '../../../geometry/picture_context'

export const ROTATE_COMMAND: AdjustCommand = new AdjustCommand({
  name: 'Rotate',
  shortcutKey: 'r',
  datasetDefinition: null,
  onDrag: function (picture: Picture, context: PictureContext): Picture {
    return picture.rotate(context.start, context.end)
  },
  getSummary: function (picture: Picture, context: PictureContext): string {
    return `Rotate ${picture.name} by (TODO)`
  }
})
