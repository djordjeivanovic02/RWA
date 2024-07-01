import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  mainImagePath: string;
  constructor(){
    this.mainImagePath = '/assets/images/main-image.png'
  }
}
