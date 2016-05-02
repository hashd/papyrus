import { DataDefinition } from './data_definition'

export class DatasetDefinition {
  dataDefinitions: DataDefinition[] = []
  
  addDataDefinition(name: string, type: string): DataDefinition {
    const dd = new DataDefinition()
    dd.name = name || `data-element-${this.dataDefinitions.length}`
    dd.type = type
    dd.defaultValue = this.getDefaultValueForType(type)
    
    this.dataDefinitions.push(dd)
    
    return dd
  }
  
  removeDataDefinition(id) {
    const idx = this.dataDefinitions.reduce((acc, dd, idx) => dd.id === id ? idx : acc, -1)
    
    if (idx != -1) this.dataDefinitions.splice(idx, 1)
  }
  
  
  modifyDataDefinition(id, name, type) {
    const dd: DataDefinition = this.dataDefinitions.reduce((acc, d) => d.id === id ? d : acc, undefined)
    
    if (dd !== undefined) {
      if (name) dd.name = name
      if (type) dd.type = type
    }
  }
  
  private getDefaultValueForType(type: string): any {
    switch (type) {
      case 'number': return 0
      case 'string': return '' 
      case 'array': return []
      default: return undefined
    }
  }
}
