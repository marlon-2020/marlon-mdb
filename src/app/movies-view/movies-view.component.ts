import { SortsService } from './../services/sorts.service';
import { Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { HttpTmdbService } from '../services/http-tmdb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies-view',
  templateUrl: './movies-view.component.html',
  styleUrl: './movies-view.component.sass'
})
export class MoviesViewComponent implements OnInit, OnDestroy {
  constructor(
    private renderer: Renderer2,
    private element: ElementRef,
    private tmdb: HttpTmdbService,
    private organize: SortsService,
    private router: Router
  ) { }

  moviesList: any[] = []
  copyMoviesList: any[] = []
  carouselList: any[] = []  
  carousel: any;

  ngOnInit(): void {
    
    this.tmdb.getMoviesList().subscribe(
      (data: any) => {
        this.moviesList = data.results
      }
    )
    this.tmdb.getMovieListByPopularity().subscribe((data: any)=>{
      this.carouselList.push(data.results[0])
      this.carouselList.push(data.results[1])
      this.carouselList.push(data.results[2])
    }) 
  }

  setSort(id: string){
    if(id == 'title' ){
      this.moviesList = this.organize.sortByTitle(this.moviesList)
    }else if(id == 'date'){
      this.moviesList = this.organize.sortByDate(this.moviesList)
    }else if(id == 'default'){
      this.tmdb.getMoviesList().subscribe((data: any)=>{
        this.moviesList = data.results
      })
    }
  }

  goToMoviesDetails(value: string){
    this.router.navigate(['/movie-details',value])
  }

  
  guardTranslate=0
  i = 1
  carouselSlide(){
    let movie = this.renderer.selectRootElement(this.element.nativeElement, true)
    let imgs = movie.querySelectorAll('img.item')
    imgs[this.i%imgs.length].style.width = '350px'
    imgs[(this.i+1)%imgs.length].style.width = '0px'
    imgs[(this.i+2)%imgs.length].style.width = '0px'
    this.i++
    if(this.i == 3){
      this.i=0
    }

  }

  ngOnDestroy() {
  }
}
