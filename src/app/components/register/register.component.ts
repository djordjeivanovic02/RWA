import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { registerr } from '../../store/auth/auth.actions';
import { selectAuthError, selectAuthToken } from '../../store/auth/auth.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  mainImagePath: string;
  name: string = '';
  surname: string = '';
  email: string = '';
  password: string = '';
  repeatedPassword: string = '';
  token$: Observable<string | null>;
  error$: Observable<any| null>;

  isError: boolean = false;
  errorText: string = '';


  constructor(
    private store: Store
  ){
    this.mainImagePath = '/assets/images/login-background.jpg';
    this.token$ = this.store.pipe(select(selectAuthToken));
    this.error$ = this.store.pipe(select(selectAuthError));
  }

  onRegister() {
    this.isError = false;
    if(this.isFormValid()){
      if(this.password === this.repeatedPassword){
        this.store.dispatch(registerr({ name: this.name, surname: this.surname, email: this.email, password: this.password }));
      }else{
        this.showError("Lozinke se ne poklapaju");
      }
    }else{
      this.showError("Morate uneti sva polja");
    }
  }

  onNameChange(value: string): void{
    this.name = value;
  }
  onSurnameChange(value: string): void{
    this.surname = value;
  }
  onEmailChange(value: string): void{
    this.email = value;
  }
  onPasswordChange(value: string): void{
    this.password = value;
  }
  onRepeatedPasswordChange(value: string): void{
    this.repeatedPassword = value;
  }

  isFormValid(): boolean {
    return this.name.trim() !== '' && 
           this.surname.trim() !== '' && 
           this.email.trim() !== '' && 
           this.password.trim() !== ''  && 
           this.repeatedPassword.trim() !== '' ;
  }

  showError(text: string){
    console.log(text);
    this.isError = true;
    this.errorText = text;
  }
}
