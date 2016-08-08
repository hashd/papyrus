import { ValueType } from './../core/data/data_definition'

export enum TokenType {
  NUMBER, OP1, OP2, VAR, FUNCALL, LITERAL
}

export class Token {
  private _type: TokenType
  private _index: string
  private _prio: number
  private _value: ValueType

  constructor(type: TokenType, index: string | number = '0', prio: number = 0, value: ValueType = 0) {
    this._type = type
    this._index = String(index)
    this._prio = prio
    this._value = value
  }

  get type() {
    return this._type
  }

  get index() {
    return this._index
  }

  get prio() {
    return this._prio
  }

  get value() {
    return this._value
  }

  toString(): string {
    switch (this._type) {
      case TokenType.LITERAL:
        return '' + this.value
      case TokenType.OP1:
      case TokenType.OP2:
      case TokenType.VAR:
        return '' + this.index
      case TokenType.FUNCALL:
        return 'CALL'
      default:
        return 'Invalid Token'
    }
  }
}
