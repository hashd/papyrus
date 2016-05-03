import { ElementRef } from 'angular2/core'

export interface Drawable {
  draw(data: Object)
}

export interface Moveable {
  move(x: number, y: number)
}

export interface Scalable {
  scale(xRatio: number, yRatio: number)
}

export interface Rotatable {
  rotate(angle: number)
}

export interface Appendable {
  append(el: ElementRef)
}

export interface Visualizable extends Drawable, Moveable, Scalable, Rotatable {
  
}

export interface AppendableViz extends Visualizable, Appendable {
  
}
