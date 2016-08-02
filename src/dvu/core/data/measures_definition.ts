import {MeasureDefinition, MeasureType, ValueType} from './measure_definition'

export class MeasuresDefinition {
  measureDefinitions: MeasureDefinition[] = []
  
  addDataDefinition(name: string, type: MeasureType): MeasureDefinition {
    const dd = new MeasureDefinition(name || `measure-${this.measureDefinitions.length}`, type)

    this.measureDefinitions.push(dd)
    return dd
  }
  
  removeDataDefinition(id: string) {
    const idx = this.measureDefinitions.reduce((acc, dd, idx) => dd.id === id ? idx : acc, -1)
    
    if (idx != -1) {
      this.measureDefinitions.splice(idx, 1)
    }
  }
  
  modifyDataDefinition(id: string, name: string, type: MeasureType) {
    const dd: MeasureDefinition = this.measureDefinitions.reduce((acc, d) => d.id === id ? d : acc, undefined)
    
    if (dd !== undefined) {
      if (name) dd.name = name
      if (type) dd.type = type
    }
  }

  setDefaultValue(id, value: ValueType) {
    const dd: MeasureDefinition = this.measureDefinitions.reduce((acc, d) => d.id === id ? d : acc, undefined)

    if (dd !== undefined) {
      dd.setDefaultValue(value)
    }
  }

  validate(data: Object) {
    return this.measureDefinitions.reduce((acc, dd) => acc && dd.validate(data[dd.name]), true)
  }
}
