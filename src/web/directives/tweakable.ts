import { Directive, ElementRef, AfterViewInit } from '@angular/core'

@Directive({
  selector: '[tweakable]'
})
export class Tweakable implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    // console.log(this.elementRef, this.elementRef.nativeElement)
  }
}
