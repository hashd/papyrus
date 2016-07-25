import { Point } from './../geometry/cartesian_system'
import { Dimensions } from './../geometry/dimensions'
import { SVG } from './../core/helpers/svg'

const RADIAN_TO_DEGREE_FACTOR = 180/Math.PI

export interface Picture {
  name: string
  element: Element
  boundingElement: Element
  magnets: Element[]
  dimensions: Dimensions

  move: (initPoint: Point, endPoint: Point) => any
  rotate: (initPoint: Point, endPoint: Point) => any
  scale: (initPoint: Point, endPoint: Point) => any
  duplicate: () => Picture
  
  getHandle: () => Element
  getInnerElements: () => Element[]
}

export abstract class AbstractPicture implements Picture {
  name: string
  element: Element
  boundingElement: Element
  magnets: Element[]
  dimensions: Dimensions

  moveOffset: Point = { x: 0, y: 0 }
  rotateAngle: number = 0
  scaleFactor: Point = { x: 0, y: 0 }

  move(initPoint: Point, endPoint: Point): any {
    this.moveOffset.x += (endPoint.x - initPoint.x)
    this.moveOffset.y += (endPoint.y - initPoint.y)
    
    this.updateTransform()
  }

  rotate(initPoint: Point, endPoint: Point): any {
    const rotationSlope = (endPoint.y - initPoint.y)/(endPoint.x - initPoint.x)

    this.rotateAngle += (Math.atan(rotationSlope) * RADIAN_TO_DEGREE_FACTOR)
    
    this.updateTransform()
  }

  scale(initPoint: Point, endPoint: Point): any {
    this.scaleFactor.x *= (endPoint.x/initPoint.x)
    this.scaleFactor.y *= (endPoint.y/initPoint.y) 

    this.updateTransform()
  }
  
  duplicate(): Picture {
    return this
  }
  
  getHandle(): Element {
    return SVG.createGroup([this.boundingElement, ...this.magnets], this.dimensions.width, this.dimensions.height)
  }

  getInnerElements(): Element[] {
    return [].slice.call(this.element)
  }

  /**
   * Update the transform property of the current picture since scale has changed
   */
  private updateTransform() {
    const translateProperty = `translate(${this.moveOffset.x}, ${this.moveOffset.y})`,
          rotateProperty = `rotate(${this.rotateAngle})`,
          scaleProperty = `scale(${this.scaleFactor.x}, ${this.scaleFactor.y})`
    
    this.element.setAttributeNS(null, 'transform', `${translateProperty} ${rotateProperty} ${scaleProperty}`)
  }
}