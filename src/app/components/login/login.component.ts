import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  mainImagePath: string;
  constructor(){
    this.mainImagePath = '/assets/images/login-background.jpg'
  }
}
