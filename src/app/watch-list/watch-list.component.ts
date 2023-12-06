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
      console.log(this.watchList)
    }
    
  }

  goToMoviesDetails(value: string){
    this.router.navigate(['/movie-details',value])
  }

}
