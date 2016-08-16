export const sin = Math.sin
export const cos = Math.cos
export const tan = Math.tan
export const asin = Math.asin
export const acos = Math.acos
export const atan = Math.atan
export const sqrt = Math.sqrt
export const log = Math.log
export const lg = log10
export const abs = Math.abs
export const ceil = Math.ceil
export const floor = Math.floor
export const round = Math.round
export const exp = Math.exp

export function sinh(a: number) {
  return (Math.exp(a) - Math.exp(-a)) / 2
}

export function cosh(a: number) {
  return (Math.exp(a) + Math.exp(-a)) / 2
}

export function tanh(a: number) {
  if (a === Infinity) return 1
  if (a === -Infinity) return -1

  return (Math.exp(a) - Math.exp(-a)) / (Math.exp(a) + Math.exp(-a))
}

export function asinh(a: number) {
  if (a === -Infinity) return a

  return Math.log(a + Math.sqrt(a * a + 1))
}

export function acosh(a: number) {
  return Math.log(a + Math.sqrt(a * a - 1))
}

export function atanh(a: number) {
  return (Math.log((1 + a) / (1 - a)) / 2)
}

export function log10(a: number) {
  return Math.log(a) * Math.LOG10E
}

export function neg(a: number) {
  return -a
}

export function trunc(a: number) {
  return a < 0 ? Math.ceil(a) : Math.floor(a)
}

export const min = Math.min
export const max = Math.max
export const pow = Math.pow
export const atan2 = Math.atan2

export function random(a: number) {
  return Math.random() * (a || 1)
}

export function fac(a: number) {
  let b = 1
  for (let i = 0; i < a; i++) {
    b = b * a
  }
  return b
}

export function hypot(...nums: number[]) {
  return Math.sqrt(nums.reduce((acc, num) => acc + (num * num)))
}

export function condition(cond, yep, nope) {
  return cond ? yep : nope
}

export function add(a: number, b: number) {
  return a + b
}

export function sub(a: number, b: number) {
  return a - b
}

export function mul(a: number, b: number) {
  return a * b
}

export function div(a: number, b: number) {
  return a / b
}

export function mod(a: number, b: number) {
  return a % b
}

export function concat(a: number | string, b: number | string) {
  return '' + a + b
}

export function equal(a: number | string, b: number | string) {
  return a === b
}

export function notEqual(a: number | string, b: number | string) {
  return !equal(a, b)
}

export function greaterThan(a: number, b: number) {
  return a > b
}

export function lessThan(a: number, b: number) {
  return a < b
}

export function greaterThanEqual(a: number, b: number) {
  return a >= b
}

export function lessThanEqual(a: number, b: number) {
  return a <= b
}

export function and(a, b) {
  return Boolean(a && b)
}

export function or(a, b) {
  return Boolean(a || b)
}

export function append(a, b): any[] {
  if (Object.prototype.toString.call(a) !== '[object Array]') {
    return [a, b]
  }

  return [...a, b]
}

export const builtinOps1: {[key: string]: (a: any) => any} = {
  sin,
  cos,
  tan,
  asin,
  acos,
  atan,
  sinh,
  cosh,
  tanh,
  asinh,
  acosh,
  atanh,
  log10,
  neg,
  trunc,
  sqrt,
  log,
  lg,
  abs,
  ceil,
  floor,
  round,
  exp
}

export const builtinOps2: {[key: string]: (a: any, b: any) => any} = {
  '+': add,
  '-': sub,
  '*': mul,
  '/': div,
  '%': mod,
  '^': pow,
  ',': append,
  '||': concat,
  '--': equal,
  '!=': notEqual,
  '>': greaterThan,
  '<': lessThan,
  '>=': greaterThanEqual,
  '<=': lessThanEqual,
  'and': and,
  'or': or
}

export const builtinFunctions = {
  random,
  fac,
  min,
  max,
  hypot,
  pow,
  atan2,
  if: condition
}

export const consts = {
  E: Math.E,
  PI: Math.PI
}

export const all = {
  sin,
  cos,
  tan,
  asin,
  acos,
  atan,
  sinh,
  cosh,
  tanh,
  asinh,
  acosh,
  atanh,
  log10,
  neg,
  trunc,
  sqrt,
  log,
  lg,
  abs,
  ceil,
  floor,
  round,
  exp,
  random,
  fac,
  min,
  max,
  hypot,
  pow,
  atan2,
  if: condition,
  E: Math.E,
  PI: Math.PI
}
