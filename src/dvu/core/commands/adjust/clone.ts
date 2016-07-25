import { AdjustCommand, AdjustCommandInterface } from './adjust'
import { Picture } from '../../../models/picture'
import { PictureContext } from '../../../geometry/picture_context'

export const CLONE_COMMAND: AdjustCommand = new AdjustCommand({
  name: 'Duplicate',
  shortcutKey: 'd',
  datasetDefinition: null,
  onDrag: function (picture: Picture, context: PictureContext): Picture {
    return picture.duplicate()
  },
  getSummary: function (picture: Picture, context: PictureContext): string {
    return `Clone ${picture.name} as (TODO)`
  }
})