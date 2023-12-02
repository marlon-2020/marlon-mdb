import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { HttpTmdbService } from '../services/http-tmdb.service';

@Component({
  selector: 'app-movies-view',
  templateUrl: './movies-view.component.html',
  styleUrl: './movies-view.component.sass'
})
export class MoviesViewComponent implements OnInit{
  constructor(
    private renderer: Renderer2,
    private element: ElementRef, 
    private tmdb: HttpTmdbService
    ){}

  moviesList: any[] = []

  ngOnInit(): void {
    let movie = this.renderer.selectRootElement(this.element.nativeElement, true)
    let imgs = movie.querySelectorAll('img.item')
    let i = 0
    setInterval(()=>{
      imgs[i%imgs.length].style.opacity = '0'
      imgs[(i+1)%imgs.length].style.opacity = '1'
      imgs[(i+2)%imgs.length].style.opacity = '0'
      i++
      if(i==3){
        i=0
      }
    }, 5000)

    console.log(this.tmdb.getMoviesList().subscribe(
      (data: any)=>{
        console.log({url: 'https://image.tmdb.org/t/p/original'+data.results[0].backdrop_path})
        this.moviesList = data.results
        console.log(this.moviesList)
      }
    ))

  }


}
