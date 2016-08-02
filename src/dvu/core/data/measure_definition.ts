import { REGEXES } from '../../utils/regex'

export type MeasureType = 'color' | 'size' | 'length'
export type ValueType = string

export class MeasureDefinition {
  private _id: string

  get id(): string {
    return this._id
  }

  constructor(public name: string, public type: MeasureType, public defaultValue: ValueType = MeasureDefinition.getDefaultValue(type)) {

  }

  setDefaultValue(value: ValueType) {
    this.defaultValue = value
  }

  validate(value: ValueType): boolean {
    const regexKey = `${this.type.toUpperCase()}_REGEX`
    return value.match(REGEXES[regexKey]) !== null
  }

  static getDefaultValue(type: MeasureType): ValueType {
    switch (type) {
      case 'color':
        return '#000'

      case 'size':
        return '1px'
    }
  }
}
