import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnChanges } from 'angular2/core'
import { CompositeVisualization } from '../../../dvu/gfx/visualization'
import { Point } from '../../../dvu/geometry/cartesian_system'
import { PointTransform } from '../../pipes/point_transform'
import { Messages, Subjects } from 'src/web/services/messages'
import * as _  from 'lodash'

@Component({
  selector: 'pa-vis-canvas',
  template: `
    <div id="vis-canvas" class="canvas" (keydown)="keydownEvent($event)" tabindex="1" #canvas_parent>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" preserveAspectRatio="xMidYMid slice" #canvas
        (mousedown)="emitMouseEvent($event)"
        (mouseup)="emitMouseEvent($event)"
        (mousemove)="emitMouseEvent($event)"
        (mouseout)="($event.relatedTarget.localName==='div')?emitMouseEvent($event):undefined"
        (click)="clickEvent($event)"
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
    const removeStepSubject = Subjects[Messages.REMOVE_STEP],
      selectedStepSubject = Subjects[Messages.CHANGE_STEP_SELECTION];

    removeStepSubject.subscribe({
      next: (removedStep) => {
        if(removedStep) {
          //Needs to work on remove only removed step element
          if (this.workCanvas) this.clearWorkCanvas()
          if (this.vis) this.clearVis()
          this.visualization.steps.forEach(step => this.vis.nativeElement.appendChild(step.execute().element))
        }
      }
    });

    selectedStepSubject.subscribe({
      next: (selectedStep) => {
        this.selectElement(selectedStep.getElement())
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

  keydownEvent(e) {
    const keyCode = e.keyCode

    if(keyCode === 9) {
      let selectedElement
      let element

      Array.from(this.vis.nativeElement.children).forEach( child => {
        if(child.classList.contains('selected')) {
          selectedElement = child
        }
      });

      element = selectedElement && selectedElement.nextSibling ? selectedElement.nextSibling : this.vis.nativeElement.firstElementChild
      this.selectElement(element)
      this.selectionChangeMessage(element)
      e.preventDefault()
    }
  }

  clickEvent(e) {
    let element = e.target
    if(element && element.tagName !== 'svg') {
      this.selectElement(element)
      this.selectionChangeMessage(element)
      e.preventDefault()
    }
  }

  private selectElement(element) {
    if(element) {
      //assuming only one element is selected
      let selected = element.parentElement.querySelector('.selected')
      if(selected) {
        selected.classList.remove('selected')
      }

      element.classList.add('selected')
    }
  }

  private selectionChangeMessage(element) {
    //broadcast element selection change message
    const selectedStep = _.find(this.visualization.steps, function(step) { return step.getElement() === element })
    if(selectedStep) {
      const selectedElementSubject = Subjects[Messages.CHANGE_ELEMENT_SELECTION]
      selectedElementSubject.next(selectedStep)
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
