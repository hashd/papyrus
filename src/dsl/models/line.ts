import { BasicElement } from './element'
import { Magnet } from './magnet'

export class Line extends BasicElement {
  constructor(name: string, public x1: number, public y1: number, public x2: number, public y2: number) {
    super(name)

    this.setMagnets()
  }

  setMagnets() {
    const START = { x: this.x1, y: this.y1 },
          END = { x: this.x2, y: this.y2 }

    this.magnets = [
      new Magnet('start', START),
      new Magnet('end', END)
    ]
  }
}
