import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrl: './watch-list.component.sass'
})
export class WatchListComponent implements OnInit {
  
  constructor(private router: Router){}

  watchList: any[]=[]
  
  ngOnInit(): void {
    if(localStorage.getItem('wish-list')){
      this.watchList = JSON.parse(localStorage.getItem('wish-list')!)
    }
    console.log(this.watchList.length)
  }

  goToMoviesDetails(value: string){
    this.router.navigate(['/movie-details',value])
  }

  removeFromWishList(movieTitle: string){
    this.watchList.splice(this.findMovieAdded(movieTitle), 1)
    localStorage.setItem('wish-list', JSON.stringify(this.watchList))
    alert('removed with success!')
  }

  findMovieAdded(movieTitle: string){
    return this.watchList.findIndex((element)=>{
      return element.title === movieTitle
    })
  }


}
