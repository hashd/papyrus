import { Directive, ElementRef } from '@angular/core'

@Directive({
  selector: '[full-length]'
})
export class FullLength {
  constructor(private elementRef: ElementRef) {
    elementRef.nativeElement.style.height = '100%'
  }
}
