import { ESCAPABLE } from './regex'

const ESCAPE_META_MAP = {
  '\b': '\\b',
  '\t': '\\t',
  '\n': '\\n',
  '\f': '\\f',
  '\r': '\\r',
  '\'' : '\\\'',
  '\\': '\\\\'
}

const ESCAPE_REPLACER = function (char) {
  const c = ESCAPE_META_MAP[char]
  return typeof c === 'string' ? c : '\\u' + ('0000' + char.charCodeAt(0).toString(16)).slice(-4)
}

export function escapeValue(str) {
  if (typeof str === 'string') {
    ESCAPABLE.lastIndex = 0

    return ESCAPABLE.test(str) ? `'${str.replace(ESCAPABLE, ESCAPE_REPLACER)}'` : `'${str}'`
  }

  return str
}

export function hasValue(values, index) {
  const parts = index.split(/\./)
  let value = values,
      returnValue = true

  parts.forEach(part => {
    if (!(part in value)) {
      returnValue = false
      return false
    }
    value = value[part]
  })
  return returnValue
}

export function getValue(values, index) {
  return index.split(/\./).reduce((value, part) => value[part], values)
}
