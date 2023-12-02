import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[carousel]'
})
export class CarouselDirective {

  constructor(private renderer: Renderer2, private element: ElementRef) { 
    
  }

  

}
