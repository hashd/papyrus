import {DataDefinition, DataType, ValueType} from './data_definition'

export class DatasetDefinition {
  dataDefinitions: DataDefinition[] = []

  addDataDefinition(name: string, type: DataType): DataDefinition {
    const dd = new DataDefinition(name || `data-element-${this.dataDefinitions.length}`, type)

    this.dataDefinitions.push(dd)
    return dd
  }

  removeDataDefinition(id: string) {
    const idx = this.dataDefinitions.reduce((acc, dd, idx) => dd.id === id ? idx : acc, -1)

    if (idx !== -1) {
      this.dataDefinitions.splice(idx, 1)
    }
  }

  modifyDataDefinition(id: string, name: string, type: DataType) {
    const dd: DataDefinition = this.dataDefinitions.reduce((acc, d) => d.id === id ? d : acc, undefined)

    if (dd !== undefined) {
      if (name) dd.name = name
      if (type) dd.type = type
    }
  }

  setDefaultValue(id, value: ValueType) {
    const dd: DataDefinition = this.dataDefinitions.reduce((acc, d) => d.id === id ? d : acc, undefined)

    if (dd !== undefined) {
      dd.setDefaultValue(value)
    }
  }

  validate(data: Object) {
    return this.dataDefinitions.reduce((acc, dd) => acc && dd.validate(data[dd.name]), true)
  }
}
