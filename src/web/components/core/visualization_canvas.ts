import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnChanges } from 'angular2/core'
import { CompositeVisualization } from '../../../dvu/gfx/visualization'
import { Point } from '../../../dvu/geometry/cartesian_system'
import { PointTransform } from '../../pipes/point_transform'
import { Step, Executable } from '../../../dvu/core/step'
import { Block } from '../../../dvu/core/block'
import { convertObjectModel, AdapterTypes } from '../../../dvu/adapters/adapter'
import { Messages, subjects } from '../../../web/services/messages'

@Component({
  selector: 'pa-vis-canvas',
  template: `
    <div id="vis-canvas" class="canvas" (keydown)="keydownEvent($event)" tabindex="1" #canvas_parent>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" preserveAspectRatio="xMidYMid slice" #canvas
        (mousedown)="emitMouseEvent($event)"
        (mouseup)="emitMouseEvent($event)"
        (mousemove)="emitMouseEvent($event)"
        (mouseout)="($event?.relatedTarget?.localName==='div')?emitMouseEvent($event):undefined"
        (click)="clickEvent($event)"
        (dblclick)="emitMouseEvent($event)"
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
  stepElementMap: Map = new Map()

  @ViewChild('canvas_parent') canvasParent: ElementRef
  @ViewChild('canvas') canvas: ElementRef
  @ViewChild('work') workCanvas: ElementRef
  @ViewChild('vis') vis: ElementRef

  @Output() mouse: EventEmitter<Object> = new EventEmitter()
  @Output() draw: EventEmitter<Object> = new EventEmitter()

  constructor () {
    const removeStepSubject = subjects[Messages.REMOVE_STEP],
          selectedStepSubject = subjects[Messages.CHANGE_STEP_SELECTION]

    removeStepSubject.subscribe({
      next: (step: Step) => {
        this.refreshVisualization()
      }
    })

    selectedStepSubject.subscribe({
      next: (uuid: string) => {
        if (uuid) {
          this.selectElement(this.stepElementMap.get(uuid))
        }
      }
    })
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
    if (changes.hasOwnProperty('element') && this.workCanvas) {
      if (this.workCanvas) this.clearWorkCanvas()
      if (this.element) {
        const svg = convertObjectModel(AdapterTypes.SVG, [].concat(this.element))
        if (svg) {
          this.workCanvas.nativeElement.appendChild(svg)
        }
      }

      this.refreshVisualization()
    }

    if (changes.hasOwnProperty('visualization') && this.visualization) {
      if (this.visualization.dimensions.width === 0 && this.visualization.dimensions.height === 0) {
        const canvasParent = this.canvasParent.nativeElement,
              width = canvasParent.clientWidth,
              height = canvasParent.clientHeight - 32,
              minDim = Math.min(width, height)

        this.visualization.dimensions = { width: minDim, height: minDim }
      }

      this.refreshVisualization()
    }
  }

  emitMouseEvent(event: MouseEvent) {
    // Handle only left button mouse clicks and drag events
    this.hoveredPoint = { x: event.offsetX, y: event.offsetY }

    if (event.which === 1 || (event.which === 0 && this.dragModeEnabled)) {
      this.dragModeEnabled = (event.type === 'mouseup') ? false : true

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

    if (keyCode === 9) {
      let selectedElement
      let element

      Array.from(this.vis.nativeElement.children).forEach( child => {
        if (child.classList.contains('selected')) {
          selectedElement = child
        }
      })

      element = selectedElement && selectedElement.nextSibling ? selectedElement.nextSibling : this.vis.nativeElement.firstElementChild
      this.selectElement(element)
      this.selectionChangeMessage(element)
      e.preventDefault()
    }
  }

  clickEvent(e) {
    let element = e.target
    if (element && element.tagName !== 'svg') {
      this.selectElement(element)
      this.selectionChangeMessage(element)
      e.preventDefault()
    }
  }

  private selectElement(element) {
    if (element) {
      // assuming only one element is selected
      let selected = element.parentElement.querySelector('.selected')
      if (selected) {
        selected.classList.remove('selected')
      }

      element.classList.add('selected')
    }
  }

  private selectionChangeMessage(element) {
    // broadcast element selection change message
    const selectedStep = this.visualization.block.steps.filter(step => this.stepElementMap.get(step.id) === element)

    if (selectedStep) {
      const selectedElementSubject = subjects[Messages.CHANGE_ELEMENT_SELECTION]
      selectedElementSubject.next(selectedStep)
    }
  }

  private refreshVisualization () {
    if (this.vis) this.clearVis()
    const svg = convertObjectModel(AdapterTypes.SVG, this.visualization.execute())
    if (svg) {
      this.vis.nativeElement.appendChild(svg)
    }
  }

  private clearWorkCanvas() {
    while (this.workCanvas.nativeElement.firstChild) {
      this.workCanvas.nativeElement.removeChild(this.workCanvas.nativeElement.firstChild)
    }
  }

  private clearVis() {
    this.stepElementMap.clear()
    while (this.vis.nativeElement.firstChild) {
      this.vis.nativeElement.removeChild(this.vis.nativeElement.firstChild)
    }
  }
}
