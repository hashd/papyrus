import { Magnet } from '..//models/magnet'

export interface Element {
  name: string
  getAttribute: (name: string) => string
  getAttributes: () => {[key: string]: string}
  setAttribute: (name: string, value: string) => Element
  getMagnets: () => Magnet[]
}

export interface TransformElement extends Element {
  translate: (tx: number, ty: number) => TransformElement
  scale: (sx: number, sy: number) => TransformElement
  rotate: (angle: number, rx: number, ry: number) => TransformElement
  skew: (xAngle: number, yAngle: number) => TransformElement
}

export interface TransformProperties {
  translate: {
    tx: number,
    ty: number
  }
  scale: {
    sx: number,
    sy: number
  }
  rotate: {
    angle: number,
    rx: number,
    ry: number
  }
  skewX: number
  skewY: number
}

export abstract class BasicElement implements TransformElement {
  private transformProperties: TransformProperties
  attributes: {[key: string]: string} = {}
  magnets: Magnet[] = []

  constructor(public name: string = 'unnamed') {
  }

  protected abstract setMagnets()

  getAttribute(name: string): string {
    return this.attributes[name]
  }

  getAttributes(): {[key: string]: string} {
    return this.attributes
  }

  getMagnets(): Magnet[] {
    return this.magnets
  }

  setAttribute(name: string, value: string): TransformElement {
    this.attributes[name] = value
    this.setMagnets()

    return this
  }

  setAttributes(attributes: { [key: string]: string }): TransformElement {
    for (const attr in attributes) {
      if (attributes.hasOwnProperty(attr)) {
        this.setAttribute(attr, attributes[attr])
      }
    }

    return this
  }

  translate(tx: number, ty: number): TransformElement {
    this.transformProperties.translate.tx += tx
    this.transformProperties.translate.ty += ty

    return this.transform()
  }

  scale(sx: number, sy: number): TransformElement {
    this.transformProperties.scale.sx *= sx
    this.transformProperties.scale.sy *= sy

    return this.transform()
  }

  rotate(angle: number, rx: number, ry: number): TransformElement {
    this.transformProperties.rotate.angle = angle
    this.transformProperties.rotate.rx = rx
    this.transformProperties.rotate.ry = ry

    return this.transform()
  }

  skew(xAngle: number, yAngle: number): TransformElement {
    this.transformProperties.skewX = xAngle ? xAngle : this.transformProperties.skewX
    this.transformProperties.skewY = yAngle ? yAngle : this.transformProperties.skewY

    return this.transform()
  }

  private transform(): TransformElement {
    let transformValue = ''
    const { translate: {tx, ty}, scale: {sx, sy}, rotate: {angle, rx, ry}, skewX, skewY} = this.transformProperties

    if (tx !== 0 || ty !== 0) {
      transformValue += `translate(${tx}, ${ty}) `
    }

    if (sx !== 1 || sy !== 1) {
      transformValue += `scale(${sx}, ${sy}) `
    }

    if (angle !== 0 || rx !== 0 || ry !== 0) {
      transformValue += `rotate(${angle} ${sx} ${sy})`
    }

    if (skewX !== 0) {
      transformValue += `skewX(${tx}, ${ty}) `
    }

    if (skewY !== 0) {
      transformValue += `skewY(${tx}, ${ty}) `
    }

    return this.setAttribute('transform', transformValue.trim())
  }
}
