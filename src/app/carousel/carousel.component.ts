import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { HttpTmdbService } from '../services/http-tmdb.service';
import { Router } from '@angular/router';
import { PopupService } from '../services/popup.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.sass']
})
export class CarouselComponent implements OnInit {
  constructor(
    private elementRef: ElementRef, 
    private renderer: Renderer2,
    private tmdb: HttpTmdbService,
    private router: Router,
    ) { }

  translateAmount = 0
  carouselList: any[] = []
  counter = 0

  ngOnInit(): void {  
    this.tmdb.getMovieListByPopularity().subscribe((data: any)=>{
      this.carouselList.push(data.results[0])
      this.carouselList.push(data.results[1])
      this.carouselList.push(data.results[2])
      this.carouselList.push(data.results[3])
      this.carouselList.push(data.results[4])
    }) 
  }

  right() {
    let container = this.renderer.selectRootElement(this.elementRef.nativeElement, true);
    let carousel = container.querySelector('.carousel')
    let imgs = container.querySelectorAll('img')

    if (carousel.style.transform != `translate(-${imgs[0].width * (imgs.length - 1)}px)`) {
      this.translateAmount = this.translateAmount - imgs[0].width
      carousel.style.transform = `translate(${this.translateAmount}px)`
    } else {
      this.translateAmount = 0
      carousel.style.transform = `translate(${0}px)`
    }
    this.counter++
    if(this.counter == imgs.length){
      this.counter = 0
    }
  }

  left() {
    let container = this.renderer.selectRootElement(this.elementRef.nativeElement, true);
    let carousel = container.querySelector('.carousel')
    let imgs = container.querySelectorAll('img')
    if (carousel.style.transform != '' && carousel.style.transform != 'translate(0px)') {
      this.translateAmount = this.translateAmount + imgs[0].width
      carousel.style.transform = `translate(${this.translateAmount}px)`
    } else {

      this.translateAmount = -imgs[0].width * (imgs.length - 1)
      carousel.style.transform = `translate(${-imgs[0].width * (imgs.length - 1)}px)`
    }
    this.counter--
    if(this.counter < 0){
      this.counter = imgs.length - 1
    }
  }

  goToMoviesDetails(){
    let container = this.renderer.selectRootElement(this.elementRef.nativeElement, true);
    let carousel = container.querySelector('.carousel')
    let imgs = carousel.querySelectorAll('img')
    this.router.navigate(['/movie-details', imgs[this.counter].id])
  }


}
