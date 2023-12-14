import { HttpTmdbService } from './../services/http-tmdb.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PopupService } from '../services/popup.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.sass'
})
export class MovieDetailsComponent implements OnInit {
  
  movieId: any;
  movie: any='';
  posterUrl: string = 'https://image.tmdb.org/t/p/original'
  trailerLink=''
  

  constructor(
    private activatedRoute: ActivatedRoute,
    private tmdb: HttpTmdbService,
    private popup: PopupService
    ){}

  ngOnInit(){
    
    if(localStorage.getItem('wish-list')){
      this.wishList = JSON.parse(localStorage.getItem('wish-list')!)
    }

    this.movieId = this.activatedRoute.snapshot.params['id']


    this.tmdb.getMovieById(this.movieId).subscribe((data: any) =>{
      this.movie = data      
      if(this.findMovieAdded(data.title) != -1){
        this.addButton = false
        this.removeButton = true
      }else{
        this.removeButton = false
        this.addButton = true
      }
      this.tmdb.getTrailerLink(this.movie.id).subscribe((data:any)=>{
        
        this.trailerLink = 'https://www.youtube.com/watch?v='+data.results[0].key
      })
    })


  } 
  hiddenStatus = "none"
  invert(){
    this.hiddenStatus = 'none'
  }
  wishList:any[] = []

  addToWishList(movieTitle: string){
    this.tmdb.getMovieByTitle(movieTitle)
    .subscribe((data: any)=>{
      if(this.findMovieAdded(movieTitle) == -1){
        this.wishList.push({
          title: data.results[0].title,
          url: this.posterUrl + data.results[0].backdrop_path,
          date: data.results[0].release_date,
          id: data.results[0].id
        })
        localStorage.setItem('wish-list', JSON.stringify(
          this.wishList
        ))
        this.addButton = false
        this.removeButton = true
        this.show = 'add'
        this.hiddenStatus = this.popup.changePopup(this.hiddenStatus)
      }
    })
  }

  addButton: boolean = true
  removeButton: boolean = true
  show = 'add'
  findMovieAdded(movieTitle: string){
    return this.wishList.findIndex((element)=>{
      return element.title === movieTitle
    })
  }

  removeFromWishList(movieTitle: string){
    this.wishList.splice(this.findMovieAdded(movieTitle), 1)
    localStorage.setItem('wish-list', JSON.stringify(this.wishList))
    this.show = 'remove'
    this.removeButton = false
    this.addButton = true
    this.hiddenStatus = this.popup.changePopup(this.hiddenStatus)
  }

}
