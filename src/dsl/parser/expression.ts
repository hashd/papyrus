import { Token, TokenType } from './token'
import { hasValue, getValue, escapeValue } from './../utils/parser_utils'
import { Parser } from './parser'
import { builtinOps1, builtinOps2, builtinFunctions } from './builtins'
import { ValueType } from './../core/data/data_definition'

export class Expression {
  constructor(private _tokens: Token[] = [],
              private _ops1: {[key: string]: (a: any) => any} = builtinOps1,
              private _ops2: {[key: string]: (a: any, b: any) => any} = builtinOps2,
              private _functions: {[key: string]: any} = builtinFunctions) {

  }

  get tokens() {
    return this._tokens
  }

  get ops1() {
    return this._ops1
  }

  get ops2() {
    return this._ops2
  }

  get functions() {
    return this._functions
  }

  simplify(values: {[key: string]: any}): Expression {
    let nStack: Token[] = [],
        newExpression: Token[] = [],
        l = this.tokens.length

    this.tokens.forEach((token, idx) => {
      const tokenType = token.type

      if (tokenType === TokenType.NUMBER) {
        nStack.push(token)
      } else if (tokenType === TokenType.VAR && hasValue(values, token.index)) {
        nStack.push(new Token(TokenType.NUMBER, 0, 0, getValue(values, token.index)))
      } else if (tokenType === TokenType.OP2 && nStack.length > 1) {
        const n2 = nStack.pop(),
              n1 = nStack.pop(),
              fn = this.ops2[token.index]

        nStack.push(new Token(TokenType.NUMBER, 0, 0, fn(n1.value, n2.value)))
      } else if (tokenType === TokenType.OP1 && nStack.length > 0) {
        const n1 = nStack.pop(),
              fn = this.ops1[token.index]

        nStack.push(new Token(TokenType.NUMBER, 0, 0, fn(n1.value)))
      } else {
        while (nStack.length > 0) {
          newExpression.push(nStack.shift())
        }
        newExpression.push(token)
      }
    })

    while (nStack.length > 0) {
      newExpression.push(nStack.shift())
    }

    return new Expression(newExpression, this.ops1, this.ops2, this.functions)
  }

  substitute(variable: string, expr: Expression | string): Expression {
    if (!(expr instanceof Expression)) {
      expr = new Parser().parse(String(expr))
    }

    const newExpression: Token[] = []
    this.tokens.forEach((token, idx) => {
      const tokenType = token.type

      if (tokenType === TokenType.VAR && token.index === variable) {
        (<Expression> expr).tokens.forEach(token => {
          newExpression.push(new Token(token.type, token.index, token.prio, token.value))
        })
      } else {
        newExpression.push(token)
      }
    })

    return new Expression(newExpression, this.ops1, this.ops2, this.functions)
  }

  evaluate(values: {[key: string]: any} = {}): ValueType {
    const nStack = []

    this.tokens.forEach((token, idx) => {
      const type = token.type

      switch (type) {
        case TokenType.NUMBER:
        case TokenType.LITERAL:
          nStack.push(token.value)
          break
        case TokenType.OP2: {
          const n2 = nStack.pop(), n1 = nStack.pop(),
                fn = this.ops2[token.index]

          nStack.push(fn(n1, n2))
          break
        }
        case TokenType.OP1: {
          const n1 = nStack.pop(),
                fn = this.ops1[token.index]

          nStack.push(fn(n1))
          break
        }
        case TokenType.VAR: {
          if (hasValue(values, token.index)) {
            nStack.push(getValue(values, token.index))
          } else if (hasValue(this.functions, token.index)) {
            nStack.push(getValue(this.functions, token.index))
          } else {
            throw new Error(`Undefined variable: ${token.index}`)
          }
          break
        }
        case TokenType.FUNCALL: {
          const n1 = nStack.pop(),
                fn = nStack.pop()

          if (fn.apply && fn.call) {
            if (Object.prototype.toString.call(n1) === '[object Array]') {
              nStack.push(fn.apply(undefined, n1))
            } else {
              nStack.push(fn.call(undefined, n1))
            }
          } else {
            throw new Error('${fn} is not a function.')
          }
          break
        }
        default:
          throw new Error('Invalid Expression')
      }
    })

    if (nStack.length > 1) {
      throw new Error('Invalid Expression (parity)')
    }

    return nStack[0]
  }

  variables(): string[] {
    const variables = this.tokens.filter(token => token.type === TokenType.VAR).map(token => token.index)

    return Object.keys(variables.reduce((varObj, variable) => {
      varObj[variable] = true
      return varObj
    }, {}))
  }

  toJSFunction(param, variables): Function {
    return new Function(param, `with(Parser.values) { return ${this.simplify(variables).toString(true)}; }`)
  }

  toString(toJS: boolean): string {
    const nStack = [],
          length = this.tokens.length

    this.tokens.forEach((token, idx) => {
      const tokenType = token.type

      switch (tokenType) {
        case TokenType.NUMBER:
        case TokenType.LITERAL: {
          nStack.push(escapeValue(token.value))
          break
        }

        case TokenType.OP1: {
          const a = nStack.pop(),
                fn = token.index

          if (fn === '-') {
            nStack.push(`(${fn}${a})`)
          } else {
            nStack.push(`${fn}(${a})`)
          }
          break
        }

        case TokenType.OP2: {
          const b = nStack.pop(),
                a = nStack.pop(),
                fn = token.index

          if (toJS && fn === '^') {
            nStack.push(`Math.pow(${a}, ${b})`)
          } else {
            nStack.push(`(${a}${fn}${b})`)
          }
          break
        }

        case TokenType.VAR: {
          nStack.push(token.index)
          break
        }

        case TokenType.FUNCALL: {
          const a = nStack.pop(),
                fn = nStack.pop()

          nStack.push(`${fn}(${a})`)
          break
        }

        default:
          throw new Error('Invalid Expression')
      }
    })

    if (nStack.length > 1) {
      throw new Error('Invalid Expression (parity)')
    }

    return nStack[0]
  }
}
