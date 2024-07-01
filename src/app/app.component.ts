import { CommonModule } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID  } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { faHeart, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { loadBooks } from './store/book/book.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'LibraCornerFrontend';
  
  faHeart = faHeart;
  faUser = faUser;
  faSearch = faSearch;

  constructor(
    private store: Store<AppState>,
    @Inject(PLATFORM_ID) private platformId: any
  ){}

  ngOnInit(): void {
    this.store.dispatch(loadBooks());
  }
}
