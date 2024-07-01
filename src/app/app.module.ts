import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookItemComponent } from './components/book-item/book-item.component';
import { BookScreenComponent } from './components/book-screen/book-screen.component';
import { HomeComponent } from './components/home/home.component';
import { provideClientHydration } from '@angular/platform-browser';
import { StoreModule, provideStore } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { BooksEffects } from './store/book/book.effect';
import { reducers, metaReducers } from './app.state';
import { LoginComponent } from './components/login/login.component';
import { TextInputComponent } from './components/parts/text-input/text-input.component';
import { LoginRegisterButtonComponent } from './components/parts/login-register-button/login-register-button.component';
import { RegisterComponent } from './components/register/register.component';
@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    BookListComponent,
    BookItemComponent,
    BookScreenComponent,
    HomeComponent,
    LoginComponent,
    TextInputComponent,
    LoginRegisterButtonComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FontAwesomeModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({maxAge: 125}),
    EffectsModule.forRoot(BooksEffects)
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
