import {PictureCommand} from 'src/dvu/core/commands/picture'
import {DatasetDefinition} from 'src/dvu/core/data/dataset_definition'
import {Step} from 'src/dvu/core/step'

type Definition = string
type Code = string

export interface PictureBuilderInterface {
  build(): PictureCommand
  import(def: Definition): PictureCommand
  export(): string
  exportAsCode(): string
}

export class PictureBuilder implements PictureBuilderInterface {
  constructor(public _datasetDefinition: DatasetDefinition = new DatasetDefinition(),
              public _measureDefinition: DatasetDefinition = new DatasetDefinition(),
              public _steps: Step[] = []) {

  }

  addStep(step: Step) {
    this._steps.push(step)
  }

  getStep(idx: number) {
    return this._steps[idx]
  }

  /**
   * Build visualization class using the visualization definition provided by the user
   * through the visual editor
   */
  build(): PictureCommand {
    const self = this

    return class Picture extends PictureCommand {
      static steps: Step[] = self._steps
      static datasetDefinition: DatasetDefinition = self._datasetDefinition
      static measureDefinition: DatasetDefinition = self._measureDefinition

      constructor() {
        super()
      }
    }
  }

  /**
   * Import visualization builder spec from an export
   */
  import(def: Definition): PictureBuilderInterface {
    return this.build()
  }

  /**
   * Export visualization builder spec into a string format
   */
  export(): Definition {
    return JSON.stringify({
      steps: this._steps,
      datasetDefinition: this._datasetDefinition,
      measureDefinition: this._measureDefinition
    })
  }

  exportAsCode(): Code {
    // TODO: Implement this later on
    return 'Nothing here yet.'
  }
}
