import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  mainImagePath: string;
  constructor(){
    this.mainImagePath = '/assets/images/login-background.jpg'
  }

  onEmailChange(value: string): void{
    console.log(value);
  }
}
