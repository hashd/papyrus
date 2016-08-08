import { Element, SimpleAbstractTransformElement } from './element'

class Group extends SimpleAbstractTransformElement {
  constructor(private _elements: Element[] = []) {
    super()
  }

  get elements() {
    return this._elements
  }
}
