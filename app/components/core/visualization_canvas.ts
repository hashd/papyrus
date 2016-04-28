import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnChanges } from 'angular2/core'
import { CompositeVisualization } from '../../models/visualization'

@Component({
  selector: 'pa-vis-canvas',
  template: `
    <div id="vis-canvas" class="canvas" #canvas_parent>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" preserveAspectRatio="xMidYMid slice" #canvas 
        (mousedown)="emitMouseEvent($event)" 
        (mouseup)="emitMouseEvent($event)"
        (mousemove)="emitMouseEvent($event)"
      >
      </svg>
    </div>
  `
})
export class VisualizationCanvas implements AfterViewInit, OnChanges {
  @Input() visualization: CompositeVisualization
  
  @ViewChild('canvas_parent') canvasParent: ElementRef
  @ViewChild('canvas') canvas: ElementRef
  
  @Output() mouse: EventEmitter<Object> = new EventEmitter()
  @Output() draw: EventEmitter<Object> = new EventEmitter()
  
  ngAfterViewInit() {
    this.setCanvasDimensions()
  }
  
  setCanvasDimensions() {
    const canvasParent = this.canvasParent.nativeElement,
      canvas = this.canvas.nativeElement,
      width = canvasParent.clientWidth,
      height = canvasParent.clientHeight - 32,
      minDim = Math.min(width, height)
      
    canvas.setAttribute('viewBox', `0 0 ${minDim} ${minDim}`)
    canvas.setAttribute('height', minDim)
    canvas.setAttribute('width', minDim)
  }
  
  ngOnChanges(inputChanges) {
    // Do something on input changes
  }
  
  emitMouseEvent(event: MouseEvent) {
    this.mouse.emit({
      x: event.offsetX,
      y: event.offsetY,
      type: event.type
    })
  }
}
