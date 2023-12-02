import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { MoviesViewComponent } from './movies-view/movies-view.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { SearchMoviesComponent } from './search-movies/search-movies.component';

const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  {path: '', redirectTo: '/welcome', pathMatch: 'full'},
  {path: 'movies-view', component: MoviesViewComponent},
  {path: 'movie-details', component: MovieDetailsComponent},
  {path: 'search-movie', component: SearchMoviesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
