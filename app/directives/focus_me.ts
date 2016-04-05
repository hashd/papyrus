import { Directive, ElementRef, AfterViewInit } from 'angular2/core'

@Directive({
  selector: '[focus-me]'
})
export class FocusMe implements AfterViewInit {
    constructor(private elementRef: ElementRef) {}
    
    ngAfterViewInit() {
      // set focus when element first appears
      this.setFocus();
    }
    
    setFocus() {
      this.elementRef.nativeElement.focus();
    }
}