import { SimpleAbstractTransformElement } from './element'

export class Line extends SimpleAbstractTransformElement {
  constructor(private _x1: number, private _y1: number, private _x2: number, private _y2: number) {
    super()

    this.setMagnets()
  }

  get x1() { return this.attributes['x1'] }
  get y1() { return this.attributes['y1'] }
  get x2() { return this.attributes['x2'] }
  get y2() { return this.attributes['y2'] }

  protected setMagnets() {
    this._magnets = [{ x: parseInt(this.x1), y: parseInt(this.y1) }, { x: parseInt(this.x2), y: parseInt(this.y2) }]
  }
}
