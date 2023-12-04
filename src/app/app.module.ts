import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MoviesViewComponent } from './movies-view/movies-view.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { SearchMoviesComponent } from './search-movies/search-movies.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuSlideDirective } from './directives/open-menu-slide.directive';
import { CloseMenuSlideDirective } from './directives/close-menu-slide.directive';
import { CarouselDirective } from './directives/carousel.directive';
import { GenreFilterPipe } from './pipes/genre-filter.pipe';
import { WatchListComponent } from './watch-list/watch-list.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    MoviesViewComponent,
    MovieDetailsComponent,
    SearchMoviesComponent,
    HeaderComponent,
    FooterComponent,
    MenuSlideDirective,
    CloseMenuSlideDirective,
    CarouselDirective,
    GenreFilterPipe,
    WatchListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
