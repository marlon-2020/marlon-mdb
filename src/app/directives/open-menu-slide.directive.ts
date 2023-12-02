import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[menuSlide]'
})
export class MenuSlideDirective {

  @HostListener('click') openMenu(){
    let menu = this.renderer.nextSibling(this.element.nativeElement)
    menu.style.width = '75%'
  }
  constructor(private renderer: Renderer2, private element: ElementRef) {
  }

}
