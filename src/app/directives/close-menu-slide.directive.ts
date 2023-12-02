import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[closeMenuSlide]'
})
export class CloseMenuSlideDirective {

  @HostListener('click') closeMenuSlide(){
    let menu = this.renderer.parentNode(this.element.nativeElement)
    menu.style.width = '0'
  }

  constructor(private renderer: Renderer2, private element: ElementRef) { }

}
