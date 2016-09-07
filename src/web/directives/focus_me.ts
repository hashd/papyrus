import { Directive, ElementRef, AfterViewInit } from '@angular/core'

@Directive({
  selector: '[focus-me]'
})
export class FocusMe implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.setFocus()
    this.selectAll()
  }

  setFocus() {
    this.elementRef.nativeElement.focus()
  }

  selectAll() {
    this.elementRef.nativeElement.select()
  }
}
