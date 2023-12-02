import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.sass'
})
export class WelcomeComponent {
  
  constructor(private router: Router){}

  enterMovieView(){
    this.router.navigate(['/movies-view'])
  }
}
