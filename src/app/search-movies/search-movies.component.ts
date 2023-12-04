import { HttpTmdbService } from './../services/http-tmdb.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
  styleUrl: './search-movies.component.sass'
})
export class SearchMoviesComponent {
  constructor(private tmdb: HttpTmdbService){}

  movie: any='';
  posterUrl: string = 'https://image.tmdb.org/t/p/original'

  searchMovieByTitle(value: string){
    this.tmdb.getMovieByTitle(value).subscribe((data: any)=>{
      this.movie = data.results[0]
    })
  }

}
