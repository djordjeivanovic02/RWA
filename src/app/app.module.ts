import { APP_ID, NgModule, PLATFORM_ID, TransferState, inject, makeStateKey } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, isPlatformServer } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookItemComponent } from './components/book-item/book-item.component';
import { BookScreenComponent } from './components/book-screen/book-screen.component';
import { HomeComponent } from './components/home/home.component';
import { provideClientHydration } from '@angular/platform-browser';
import { INIT, StoreModule, provideStore } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { BooksEffects } from './store/book/book.effect';
import { reducers, metaReducers } from './app.state';
import { LoginComponent } from './components/login/login.component';
import { TextInputComponent } from './components/login-register-components/text-input/text-input.component';
import { LoginRegisterButtonComponent } from './components/login-register-components/login-register-button/login-register-button.component';
import { RegisterComponent } from './components/register/register.component';
import { BookInfoClassicComponent } from './components/book-screen-components/book-info-classic/book-info-classic.component';
import { BookActionsComponent } from './components/book-screen-components/book-actions/book-actions.component';
import { ButtonComponent } from './components/parts/button/button.component';
import { BookInfoComponent } from './components/book-screen-components/book-info/book-info.component';
import { BookDescriptionComponent } from './components/book-screen-components/book-description/book-description.component';
import { BookReviewsComponent } from './components/book-screen-components/book-reviews/book-reviews.component';
import { StarsComponent } from './components/parts/stars/stars.component';
import { CustomerRatesComponent } from './components/book-screen-components/customer-rates/customer-rates.component';
import { AverageRateComponent } from './components/book-screen-components/average-rate/average-rate.component';
import { RateVisualComponent } from './components/parts/rate-visual/rate-visual.component';
import { AuthEffects } from './store/auth/auth.effect';
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
    BookInfoClassicComponent,
    BookActionsComponent,
    ButtonComponent,
    BookInfoComponent,
    BookDescriptionComponent,
    BookReviewsComponent,
    StarsComponent,
    CustomerRatesComponent,
    AverageRateComponent,
    RateVisualComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FontAwesomeModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({maxAge: 125}),
    EffectsModule.forRoot(BooksEffects, AuthEffects)
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
