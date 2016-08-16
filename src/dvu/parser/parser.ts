import { builtinOps1, builtinOps2, builtinFunctions, consts, all } from './builtins'
import { Expression } from './expression'
import { Token, TokenType } from './token'
import { ValueType } from './../core/data/data_definition'

const PRIMARY      = 1 << 0
const OPERATOR     = 1 << 1
const FUNCTION     = 1 << 2
const LPAREN       = 1 << 3
const RPAREN       = 1 << 4
const COMMA        = 1 << 5
const SIGN         = 1 << 6
const CALL         = 1 << 7
const NULLARY_CALL = 1 << 8

export class Parser {
  success: boolean = false
  errormsg: string = ''
  expression: string = ''
  column: number = 0

  pos: number = 0

  tokenNumber: number = 0
  tokenPrio: number = 0
  tokenIndex: number | string = 0
  tmpPrio: number = 0

  ops1 = builtinOps1
  ops2 = builtinOps2
  functions = builtinFunctions
  consts = consts

  parse(expr: string): Expression {
    let expected = (PRIMARY | LPAREN | FUNCTION | SIGN),
        operStack = [],
        tokenStack = [],
        noOfOperators = 0

    this.errormsg = ''
    this.success = true
    this.tmpPrio = 0
    this.expression = expr
    this.pos = 0

    while (this.pos < this.expression.length) {
      if (this.isOperator()) {
        if (this.isSign() && (expected & SIGN)) {
          if (this.isNegativeSign()) {
            this.tokenPrio = 5
            this.tokenIndex = '-'
            noOfOperators++
            this.addFunction(tokenStack, operStack, TokenType.OP1)
          }
        } else {
          if ((expected & OPERATOR) === 0) {
            this.handleParseError(this.pos, 'Unexpected Operator')
          }

          noOfOperators += 2
          this.addFunction(tokenStack, operStack, TokenType.OP2)
        }
        expected = (PRIMARY | LPAREN | FUNCTION | SIGN)
      } else if (this.isNumber()) {
        if ((expected & PRIMARY) === 0) {
          this.handleParseError(this.pos, 'Unexpected Number')
        }
        tokenStack.push(new Token(TokenType.NUMBER, 0, 0, this.tokenNumber))

        expected = (OPERATOR | RPAREN | COMMA)
      } else if (this.isString()) {
        if ((expected & PRIMARY) === 0) {
          this.handleParseError(this.pos, 'Unexpected String')
        }
        tokenStack.push(new Token(TokenType.NUMBER, 0, 0, this.tokenNumber))

        expected = (OPERATOR | RPAREN | COMMA)
      } else if (this.isLeftParen()) {
        if ((expected & LPAREN) === 0) {
          this.handleParseError(this.pos, 'Unexpected Parenthesis start')
        }

        if (expected & CALL) {
          noOfOperators += 2
          this.tokenPrio = -2
          this.tokenIndex = -1
          this.addFunction(tokenStack, operStack, TokenType.FUNCALL)
        }

        expected = (PRIMARY | LPAREN | FUNCTION | SIGN | NULLARY_CALL)
      } else if (this.isRightParen()) {
        if (expected & NULLARY_CALL) {
          tokenStack.push(new Token(TokenType.NUMBER, 0, 0, []))
        } else if ((expected & RPAREN) === 0) {
          this.handleParseError(this.pos, 'unexpected ")"')
        }

        expected = (OPERATOR | RPAREN | COMMA | LPAREN | CALL)
      } else if (this.isComma()) {
        if ((expected & COMMA) === 0) {
          this.handleParseError(this.pos, 'unexpected ","')
        }
        this.addFunction(tokenStack, operStack, TokenType.OP2)
        noOfOperators += 2

        expected = (PRIMARY | LPAREN | FUNCTION | SIGN)
      } else if (this.isConst()) {
        if ((expected & PRIMARY) === 0) {
          this.handleParseError(this.pos, 'unexpected constant')
        }
        let consttoken = new Token(TokenType.NUMBER, 0, 0, this.tokenNumber)
        tokenStack.push(consttoken)
        expected = (OPERATOR | RPAREN | COMMA)
      } else if (this.isOp2()) {
        if ((expected & FUNCTION) === 0) {
          this.handleParseError(this.pos, 'unexpected function')
        }
        this.addFunction(tokenStack, operStack, TokenType.OP2)
        noOfOperators += 2
        expected = (LPAREN)
      } else if (this.isOp1()) {
        if ((expected & FUNCTION) === 0) {
          this.handleParseError(this.pos, 'unexpected function')
        }
        this.addFunction(tokenStack, operStack, TokenType.OP1)
        noOfOperators++
        expected = (LPAREN)
      } else if (this.isVar()) {
        if ((expected & PRIMARY) === 0) {
          this.handleParseError(this.pos, 'unexpected variable')
        }
        let vartoken = new Token(TokenType.VAR, this.tokenIndex, 0, 0)
        tokenStack.push(vartoken)

        expected = (OPERATOR | RPAREN | COMMA | LPAREN | CALL)
      } else if (this.isWhite()) {

      } else {
        if (this.errormsg === '') {
          this.handleParseError(this.pos, 'unknown character')
        } else {
          this.handleParseError(this.pos, this.errormsg)
        }
      }
    }

    if (this.tmpPrio < 0 || this.tmpPrio >= 10) {
      this.handleParseError(this.pos, 'unmatched "()"')
    }

    while (operStack.length > 0) {
      tokenStack.push(operStack.pop())
    }

    if (noOfOperators + 1 !== tokenStack.length) {
      this.handleParseError(this.pos, 'parity')
    }

    return new Expression(tokenStack, this.ops1, this.ops2, this.functions)
  }

  isNumber(): boolean {
    let returnValue = false,
        str = ''

    while (this.pos <= this.expression.length) {
      const code = this.expression.charCodeAt(this.pos)
      if ((code >= 48 && code <= 57) || code === 46) {
        str += this.expression[this.pos]
        this.pos++
        this.tokenNumber = parseFloat(str)
        returnValue = true
      } else {
        break
      }
    }

    return returnValue
  }

  isString(): boolean {
    let returnValue = false,
        str = '',
        startPos = this.pos

    if (this.expression[this.pos] === '\'') {
      this.pos++

      while (this.pos < this.expression.length) {
        const code = this.expression[this.pos]
        if (code !== '\'' || str.slice(-1) === '\\') {
          str += this.expression.charAt(this.pos)
          this.pos++
        } else {
          this.pos++
          // this.tokenNumber = this.unescape(str, startPos)
          returnValue = true
          break
        }
      }
    }

    return returnValue
  }

  isConst(): boolean {
    let str
    Object.keys(this.consts).forEach(constant => {
      if (this.expression.substr(this.pos, constant.length) === constant) {
        this.tokenNumber = this.consts[constant]
        this.pos += constant.length
        return true
      }
    })

    return false
  }

  isOperator(): boolean {
    const char = this.expression[this.pos],
          nextChar = this.expression[this.pos + 1],
          nextNextChar = this.expression[this.pos + 2]

    switch (char) {
      case '+':
      case '-':
        this.tokenPrio = 2
        this.tokenIndex = char
        break
      case '>':
      case '<':
        this.tokenPrio = 1
        this.tokenIndex = (nextChar === '=') ? `${char}=` : char
        this.pos += (nextChar === '=') ? 1 : 0
        break
      case '|':
      case '=':
        if (nextChar === char) {
          this.pos++
          this.tokenPrio = 1
          this.tokenIndex = `${char}${char}`
          break
        }
        return false
      case '!':
        if (nextChar === '=') {
          this.pos++
          this.tokenPrio = 1
          this.tokenIndex = '!='
          break
        }
        return false
      case 'a':
        if (nextChar === 'n' && nextNextChar === 'd') {
          this.pos += 2
          this.tokenPrio = 2
          this.tokenIndex = 'and'
          break
        }
        return false
      case 'o':
        if (nextChar === 'r') {
          this.pos += 1
          this.tokenPrio = 2
          this.tokenIndex = 'or'
          break
        }
        return false
      case '*':
        this.tokenPrio = 3
        this.tokenIndex = '*'
        break
      case '/':
        this.tokenPrio = 4
        this.tokenIndex = '/'
        break
      case '%':
        this.tokenPrio = 4
        this.tokenIndex = '%'
        break
      case '^':
        this.tokenPrio = 6
        this.tokenIndex = '^'
        break
      default:
        return false
    }

    this.pos++
    return true
  }

  isSign(): boolean {
    return this.isPositiveSign() || this.isNegativeSign()
  }

  isPositiveSign(): boolean {
    return this.expression[this.pos - 1] === '+'
  }

  isNegativeSign(): boolean {
    return this.expression[this.pos - 1] === '-'
  }

  isLeftParen(): boolean {
    const char = this.expression[this.pos]
    if (char === '(') {
      this.pos++
      this.tmpPrio += 10
      return true
    }
    return false
  }

  isRightParen(): boolean {
    const char = this.expression[this.pos]
    if (char === ')') {
      this.pos++
      this.tmpPrio -= 10
      return true
    }
    return false
  }

  isComma(): boolean {
    const char = this.expression[this.pos]
    if (char === ',') {
      this.pos++
      this.tokenPrio = -1
      this.tokenIndex = ','
      return true
    }
    return false
  }

  isWhite(): boolean {
    const code = this.expression.charCodeAt(this.pos)
    if (code === 32 || code === 9 || code === 10 || code === 13) {
      this.pos++
      return true
    }
    return false
  }

  isOp1(): boolean {
    let str = ''
    for (let i = this.pos; i < this.expression.length; i++) {
      let c = this.expression[i]
      if (c.toUpperCase() === c.toLowerCase()) {
        if (i === this.pos || (c !== '_' && (c < '0' || c > '9'))) {
          break
        }
        str += c
      }
    }

    if (str.length > 0 && (str in this.ops1)) {
      this.tokenIndex = str
      this.tokenPrio = 7
      this.pos += str.length
      return true
    }

    return false
  }

  isOp2(): boolean {
    let str = ''
    for (let i = this.pos; i < this.expression.length; i++) {
      let c = this.expression[i]
      if (c.toUpperCase() === c.toLowerCase()) {
        if (i === this.pos || (c !== '_' && (c < '0' || c > '9'))) {
          break
        }
        str += c
      }
    }

    if (str.length > 0 && (str in this.ops2)) {
      this.tokenIndex = str
      this.tokenPrio = 7
      this.pos += str.length
      return true
    }

    return false
  }

  isVar(): boolean {
    let str = ''
    for (let i = this.pos; i < this.expression.length; i++) {
      let c = this.expression[i]
      if (c.toUpperCase() === c.toLowerCase()) {
        if (i === this.pos || (c !== '_' && c !== '.' && (c < '0' || c > '9'))) {
          break
        }
      }
      str += c
    }

    if (str.length > 0) {
      this.tokenIndex = str
      this.tokenPrio = 4
      this.pos += str.length
      return true
    }
    return false
  }

  addFunction(tokenStack: Token[], operatorStack: Token[], type: TokenType) {
    const operator = new Token(type, this.tokenIndex, this.tokenPrio + this.tmpPrio, 0)
    while (operatorStack.length > 0) {
      if (operator.prio <= operatorStack[operatorStack.length - 1].prio) {
        tokenStack.push(operatorStack.pop())
      } else {
        break
      }
    }

    operatorStack.push(operator)
  }

  handleParseError(column: number, message: string) {
    this.success = false
    this.errormsg = `Parse error at column ${column}: ${message}`
    this.column = column
    throw new Error(this.errormsg)
  }

  unescape(str: string, pos: number): string {
    let buffer = [],
        escaping = false

    for (let i = 0; i < str.length; i++) {
      const char = str[i]

      if (escaping) {
        switch (char) {
          case '\'':
            buffer.push('\'')
            break
          case '\\':
            buffer.push('\\')
            break
          case '/':
            buffer.push('/')
            break
          case 'b':
            buffer.push('\b')
            break
          case 'f':
            buffer.push('\f')
            break
          case 'n':
            buffer.push('\n')
            break
          case 'r':
            buffer.push('\r')
            break
          case 't':
            buffer.push('\t')
            break
          case 'u':
            // interpret the following 4 characters as the hex of the unicode code point
            let codePoint = parseInt(str.substring(i + 1, i + 5), 16)
            buffer.push(String.fromCharCode(codePoint))
            i += 4
            break
          default:
            throw this.handleParseError(pos + i, `Illegal escape sequence: '\${c}'`)
        }
      } else {
        if (char === '\\') {
          escaping = true
        } else {
          buffer.push(char)
        }
      }
    }

    return buffer.join()
  }

  // Comments are not being currently supported inline
  // isComment(): boolean {
  //   const prevChar = this.expression[this.pos - 1],
  //         currChar = this.expression[this.pos]

  //   if (prevChar === '/' && currChar === '*') {
  //     this.pos = this.expression.indexOf('*/', this.pos) + 2
  //     if (this.pos === 1) {
  //       this.pos = this.expression.length
  //     }

  //     return true
  //   }
  //   return false
  // }

  static parse(expr: string): Expression {
    return new Parser().parse(expr)
  }

  static evaluate(expr: string, variables?: {[key: string]: ValueType}): ValueType {
    return Parser.parse(expr).evaluate(variables)
  }

  static values = all
}
