import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { bookReducer } from './store/book/book.reducer';
import { provideEffects } from '@ngrx/effects';
import { BooksEffects } from './store/book/book.effect';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes), 
     provideClientHydration(),
     provideHttpClient(withFetch()),
     provideStore({
      books: bookReducer,
    }),
    provideEffects([BooksEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    ]
};
