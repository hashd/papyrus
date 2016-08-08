import { SimpleAbstractTransformElement } from './element.ts'

export class Line extends SimpleAbstractTransformElement {
  constructor(private _x1: number, private _y1: number, private _x2: number, private _y2: number) {
    super()
  }

  get x1() { return this._x1 }
  get y1() { return this._y1 }
  get x2() { return this._x2 }
  get y2() { return this._y2 }
}
