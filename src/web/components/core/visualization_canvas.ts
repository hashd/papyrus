import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnChanges } from 'angular2/core'
import { CompositeVisualization } from '../../../dvu/gfx/visualization'
import { Point } from '../../../dvu/geometry/cartesian_system'
import { PointTransform } from '../../pipes/point_transform'
import { Messages, Subjects } from 'src/web/services/messages'

@Component({
  selector: 'pa-vis-canvas',
  template: `
    <div id="vis-canvas" class="canvas" #canvas_parent>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" preserveAspectRatio="xMidYMid slice" #canvas
        (mousedown)="emitMouseEvent($event)"
        (mouseup)="emitMouseEvent($event)"
        (mousemove)="emitMouseEvent($event)"
        (mouseout)="($event.relatedTarget.localName==='div')?emitMouseEvent($event):undefined"
      >
        <g #vis></g>
        <g #work></g>
      </svg>
      <div class="pa-statusbar">
        <span class="lf"></span>
        <span class="rf">{{hoveredPoint | point: 'At'}}</span>
      </div>
    </div>
  `,
  pipes: [PointTransform]
})
export class VisualizationCanvas implements AfterViewInit, OnChanges {
  @Input() visualization: CompositeVisualization
  @Input() element: Element

  dragModeEnabled: boolean = false
  hoveredPoint: Point

  @ViewChild('canvas_parent') canvasParent: ElementRef
  @ViewChild('canvas') canvas: ElementRef
  @ViewChild('work') workCanvas: ElementRef
  @ViewChild('vis') vis: ElementRef

  @Output() mouse: EventEmitter<Object> = new EventEmitter()
  @Output() draw: EventEmitter<Object> = new EventEmitter()

  constructor () {
    const refreshVisualizationSubject = Subjects[Messages.REFRESHVISUALIZATION];

    refreshVisualizationSubject.subscribe({
      next: () => {
        if (this.workCanvas) this.clearWorkCanvas()
        if (this.vis) this.clearVis()
        this.visualization.steps.forEach(step => this.vis.nativeElement.appendChild(step.execute().element))
      }
    });
  }

  ngAfterViewInit() {
    this.setCanvasDimensions()
  }

  setCanvasDimensions() {
    const canvasParent = this.canvasParent.nativeElement,
      canvas = this.canvas.nativeElement,
      width = canvasParent.clientWidth,
      height = canvasParent.clientHeight - 72,
      minDim = Math.min(width, height)

    canvas.setAttribute('viewBox', `0 0 ${minDim} ${minDim}`)
    canvas.setAttribute('height', minDim)
    canvas.setAttribute('width', minDim)
  }

  ngOnChanges(changes) {
    if (this.workCanvas) this.clearWorkCanvas()
    if (this.vis) this.clearVis()

    if (changes.hasOwnProperty('element') && this.workCanvas) {
      this.visualization.steps.forEach(step => this.vis.nativeElement.appendChild(step.execute().element))
      if (this.element) {
        this.workCanvas.nativeElement.appendChild(this.element)
      }
    }

    if (changes.hasOwnProperty('visualization') && this.visualization) {
      if (this.visualization.dimensions.width === 0 && this.visualization.dimensions.height === 0) {
        const canvasParent = this.canvasParent.nativeElement,
              canvas = this.canvas.nativeElement,
              width = canvasParent.clientWidth,
              height = canvasParent.clientHeight - 32,
              minDim = Math.min(width, height)

        this.visualization.dimensions = { width: minDim, height: minDim }
      }
      this.visualization.steps.forEach(step => this.vis.nativeElement.appendChild(step.execute().element))
    }
  }

  emitMouseEvent(event: MouseEvent) {
    // Handle only left button mouse clicks and drag events
    this.hoveredPoint = { x: event.offsetX, y: event.offsetY }

    if (event.which === 1 || (event.which === 0 && this.dragModeEnabled)) {
      this.dragModeEnabled = (event.type === 'mouseup')? false: true

      // event.target should be used to get the selected element
      // if (event.type === 'mousedown') { console.log(event.target, event) }

      this.mouse.emit({
        canvas: this.canvas,
        x: event.offsetX,
        y: event.offsetY,
        target: event.target,
        type: event.type
      })
    }

    if (event.type === 'mouseout') {
      this.hoveredPoint = null
    }
  }

  private clearWorkCanvas() {
    while (this.workCanvas.nativeElement.firstChild) {
      this.workCanvas.nativeElement.removeChild(this.workCanvas.nativeElement.firstChild)
    }
  }

  private clearVis() {
    while (this.vis.nativeElement.firstChild) {
      this.vis.nativeElement.removeChild(this.vis.nativeElement.firstChild)
    }
  }
}
