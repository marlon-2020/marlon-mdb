import { HttpTmdbService } from './../services/http-tmdb.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.sass'
})
export class MovieDetailsComponent implements OnInit {
  
  movieId: any;
  movie: any='';
  posterUrl: string = 'https://image.tmdb.org/t/p/original'

  constructor(
    private activatedRoute: ActivatedRoute,
    private tmdb: HttpTmdbService,
    ){}

  ngOnInit(){
    console.log(this.activatedRoute.snapshot.params['id'])
    this.movieId = this.activatedRoute.snapshot.params['id']
    this.tmdb.getMovieById(this.movieId).subscribe((data) =>{
      this.movie = data
      console.log(this.posterUrl+this.movie.poster_path, this.movie)
    })
  } 

}
