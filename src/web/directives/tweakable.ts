import { Directive, ElementRef, AfterViewInit } from 'angular2/core'

@Directive({
  selector: '[tweakable]'
})
export class Tweakable implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}
  
  ngAfterViewInit() {
    // console.log(this.elementRef, this.elementRef.nativeElement)
  }
}
