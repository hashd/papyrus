import { Point } from './cartesian_system'

export interface Element {
  setAttribute: (name: string, value: string) => Element
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

export abstract class SimpleAbstractTransformElement implements TransformElement {
  private transformProperties: TransformProperties
  private attributes: {[key: string]: string}

  setAttribute(name: string, value: string): SimpleAbstractTransformElement {
    this.attributes[name] = value

    return this
  }

  translate(tx: number, ty: number): SimpleAbstractTransformElement {
    this.transformProperties.translate.tx += tx
    this.transformProperties.translate.ty += ty

    return this.transform()
  }

  scale(sx: number, sy: number): SimpleAbstractTransformElement {
    this.transformProperties.scale.sx *= sx
    this.transformProperties.scale.sy *= sy

    return this.transform()
  }

  rotate(angle: number, rx: number, ry: number): SimpleAbstractTransformElement {
    this.transformProperties.rotate.angle = angle
    this.transformProperties.rotate.rx = rx
    this.transformProperties.rotate.ry = ry

    return this.transform()
  }

  skew(xAngle: number, yAngle: number): SimpleAbstractTransformElement {
    this.transformProperties.skewX = xAngle ? xAngle : this.transformProperties.skewX
    this.transformProperties.skewY = yAngle ? yAngle : this.transformProperties.skewY

    return this.transform()
  }

  private transform(): SimpleAbstractTransformElement {
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
