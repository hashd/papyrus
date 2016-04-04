import { ElementRef } from 'angular2/core'
import { Visualizable, Appendable } from '../interfaces/visualization'

export class Svg implements Visualizable, Appendable {
  parent: ElementRef
  element: ElementRef
  children: ElementRef[]
  
  append(el: ElementRef) {
    this.children.push(el)
  }
  
  draw(data) {
    
  }
  
  move(x, y) {
    
  }
  
  scale(xRatio, yRatio) {
    
  }
  
  rotate(angle) {
    
  }
}
