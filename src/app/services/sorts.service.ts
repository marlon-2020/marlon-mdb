import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortsService {

  constructor() { }

  sortByTitle(value: any){
    return value.sort((a:any, b:any)=>{
      return a.title.localeCompare(b.title)
    })

  }

  sortByDate(value: any){
    return value.sort((a:any, b:any)=>{
      return a.release_date.localeCompare(b.release_date)
    })
  }

}
