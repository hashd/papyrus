import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnChanges } from 'angular2/core'
import { CompositeVisualization } from '../../models/visualization'

@Component({
  selector: 'pa-vis-canvas',
  template: `
    <div class="canvas" #canvas_parent>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" preserveAspectRatio="xMidYMid slice" #canvas>
      </svg>
    </div>
  `
})
export class VisualizationCanvas implements AfterViewInit, OnChanges {
  @Input()
  visualization: CompositeVisualization
  
  @ViewChild('canvas_parent')
  canvasParent: ElementRef
  
  @ViewChild('canvas')
  canvas: ElementRef
  
  ngAfterViewInit() {
    this.setCanvasDimensions()
  }
  
  setCanvasDimensions() {
    const canvasParent = this.canvasParent.nativeElement,
      canvas = this.canvas.nativeElement,
      width = canvasParent.clientWidth,
      height = canvasParent.clientHeight - 32
    
    canvas.setAttribute('viewBox', `0 0 ${height} ${width}`)
    canvas.setAttribute('height', height)
    canvas.setAttribute('width', width)
  }
  
  ngOnChanges(inputChanges) {
    console.log(inputChanges)
  }
}
