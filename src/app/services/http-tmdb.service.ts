import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpTmdbService {

  constructor(private http: HttpClient) {}

  readonly options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NTY0ZDQzYzEyMmRiZTU5MmU3MjM5YjQ0ODAyOGYyNiIsInN1YiI6IjY1M2Q1NTAwZTg5NGE2MDBhZDU2YjcyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IS5Af4NUlX7Jrq9lZ5uQ-vzIGtn21FdLU_VrUIGQFx8'
    }
  };

  getMoviesList(){
    return this.http.get('https://api.themoviedb.org/3/discover/movie', this.options)
  }

  getMovieById(value: string){
    return this.http.get(`https://api.themoviedb.org/3/movie/${value}`, this.options)
  }

  getMovieByTitle(value: string){
    return this.http.get(`https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=en-US&page=1`, this.options)
  }

  getTrailerLink(value: string){
    return this.http.get(`https://api.themoviedb.org/3/movie/${value}/videos`, this.options)
  }
  
}
