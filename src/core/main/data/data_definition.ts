export type DataType = 'string' | 'number' | 'array' | 'expression' | 'element'
export type ValueType = string | number | Array<any> | Element

export class DataDefinition {
  id: string
  defaultValue: ValueType
  
  constructor(public name: string, public type: DataType) {
    this.id = `dd-${+new Date()}`
    this.defaultValue = this.getDefaultValueForType(type)
  }

  private getDefaultValueForType(type: DataType): ValueType {
    switch (type) {
      case 'number':
        return 0

      case 'string':
      case 'expression':
        return ''

      case 'array':
        return []

      case 'element':
        return undefined

      default:
        return undefined
    }
  }
}
