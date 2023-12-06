import { HttpTmdbService } from './../services/http-tmdb.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
  styleUrl: './search-movies.component.sass'
})
export class SearchMoviesComponent implements OnInit {

  constructor(private tmdb: HttpTmdbService){}

  ngOnInit(): void {
    if(localStorage.getItem('wish-list')){
      this.wishList = JSON.parse(localStorage.getItem('wish-list')!)
    }
    this.addButton = false
    this.removeButton = false
  }

  movie: any='';
  posterUrl: string = 'https://image.tmdb.org/t/p/original'
  trailerLink: string = ''
  searchMovieByTitle(value: string){
    this.tmdb.getMovieByTitle(value).subscribe((data: any)=>{
      this.movie = data.results[0]
      if(this.findMovieAdded(data.results[0].title) != -1){
        this.addButton = false
        this.removeButton = true
      }else{
        this.removeButton = false
        this.addButton = true
      }
      this.tmdb.getTrailerLink(this.movie.id).subscribe((data:any)=>{
        console.log(data.results[0])
        this.trailerLink = 'https://www.youtube.com/watch?v='+data.results[0].key
      })
    })
  }

  wishList:any[] = []

  addToWishList(movieTitle: string){
    this.tmdb.getMovieByTitle(movieTitle)
    .subscribe((data: any)=>{
      if(this.findMovieAdded(movieTitle) == -1){
        this.wishList.push({
          title: data.results[0].title,
          url: this.posterUrl + data.results[0].poster_path,
          date: data.results[0].release_date,
          id: data.results[0].id
        })
        localStorage.setItem('wish-list', JSON.stringify(
          this.wishList
        ))
        this.addButton = false
        this.removeButton = true
        alert('Added With Success!')
      }else{
        alert('Already Added!')
      }
    })
  }

  addButton: boolean = true
  removeButton: boolean = true

  findMovieAdded(movieTitle: string){
    return this.wishList.findIndex((element)=>{
      return element.title === movieTitle
    })
  }

  removeFromWishList(movieTitle: string){
    this.wishList.splice(this.findMovieAdded(movieTitle), 1)
    localStorage.setItem('wish-list', JSON.stringify(this.wishList))
    
    this.removeButton = false
    this.addButton = true
    alert('removed with success!')
  }

}
