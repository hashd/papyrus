export class Scope {
  data: {[key: string]: any} = {}
  depth: number
  global: Scope

  constructor(public parent: Scope = null) {
    this.depth = this.parent ? parent.depth + 1 : 0
    this.global = this.parent ? parent.global : this
  }

  add(key: string, value: any) {
    this.data[key] = value
  }

  getValue(key: string) {
    if (this.data[key] != null && this.data[key] != undefined) {
      return this.data[key]
    }

    return this.parent.getValue(key)
  }
}
