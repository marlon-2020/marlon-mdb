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
    let movie = this.renderer.selectRootElement(this.element.nativeElement, true)
    let imgs = movie.querySelectorAll('img.item')
    let i = 0
    // this.carousel = setInterval(() => {
    //   imgs[i % imgs.length].style.transform = `translate(-${(i + 1) * 350}px)`
    //   imgs[(i + 1) % imgs.length].style.transform = `translate(-${(i + 1) * 350}px)`
    //   imgs[(i + 2) % imgs.length].style.transform = `translate(-${(i + 1) * 350}px)`
    //   i++
    //   if (i == 3) {
    //     i = 0
    //     imgs[i % imgs.length].style.transform = `translate(0px)`
    //     imgs[(i + 1) % imgs.length].style.transform = `translate(350px)`
    //     imgs[(i + 2) % imgs.length].style.transform = `translate(700px)`
    //   }
    // }, 1000)

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

  ngOnDestroy() {
    if (this.carousel) {
      clearInterval(this.carousel)
    }
  }
}
