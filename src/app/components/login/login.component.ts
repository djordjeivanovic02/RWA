import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAuthError, selectAuthToken } from '../../store/auth/auth.selector';
import { login } from '../../store/auth/auth.actions';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class LoginComponent {
  mainImagePath: string;
  token$: Observable<string | null>;
  error$: Observable<any| null>;
  username: string = '';
  password: string = '';

  constructor(
    private store: Store
  ){
    this.mainImagePath = '/assets/images/login-background.jpg';
    this.token$ = this.store.pipe(select(selectAuthToken));
    this.error$ = this.store.pipe(select(selectAuthError)); 
  }
  onLogin() {
    this.store.dispatch(login({ username: this.username, password: this.password }));
  }

  onEmailChange(value: string): void{
    this.username = value;
  }
  onPasswordChange(value: string): void{
    this.password = value;
  }
}
