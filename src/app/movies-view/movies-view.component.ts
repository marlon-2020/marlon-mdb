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

  carousel: any;

  ngOnInit(): void {
    
    this.tmdb.getMoviesList().subscribe(
      (data: any) => {
        this.moviesList = data.results
      }
    )

  }

  setSort(id: string){
    if(id == 'title' ){
      this.moviesList = this.organize.sortByTitle(this.moviesList)
    }else if(id == 'date'){
      this.moviesList = this.organize.sortByDate(this.moviesList)
      console.log(this.moviesList)
    }else if(id == 'default'){
      this.tmdb.getMoviesList().subscribe((data: any)=>{
        this.moviesList = data.results
      })
    }
  }

goToMoviesDetails(value: string){
  this.router.navigate(['/movie-details',value])
}

  i = 0
  carouselSlide(){
    let movie = this.renderer.selectRootElement(this.element.nativeElement, true)
    let imgs = movie.querySelectorAll('img.item')
    if (this.i > 2) {
      this.i = 0
    }
    for(let img of imgs){
      img.style.transform = `translate(${-this.i*350}px)`
    }
    this.i++
  }

  ngOnDestroy() {
  }
}
