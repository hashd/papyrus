import { createID } from 'src/dsl/utils/uuid'

export type DataType = 'string' | 'number' | 'array' | 'expression' | 'element' | 'boolean'
export type ValueType = string | number | Array<any> | Element | boolean

export class DataDefinition {
  id: string

  constructor(public name: string, public type: DataType, public defaultValue: ValueType = getDefaultValueForType(type)) {
    this.id = createID()
  }

  setDefaultValue(value: ValueType): boolean {
    this.defaultValue = value
    return true
  }

  validate(value: ValueType): boolean {
    // TODO: add logic to validate a value against a valuetype
    return true
  }
}

export function getDefaultValueForType(type: DataType): ValueType {
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
