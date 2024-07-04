import { CommonModule } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID  } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faUser, faSearch, faAdd } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { loadBooks } from './store/book/book.actions';
import { LocalStorageService } from './services/local-storage.service';
import { loginSuccess, logout } from './store/auth/auth.actions';
import { AuthService } from './services/auth.service';
import { getUserReadedBooks, getUserToReadBooks } from './store/booklist/booklist.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'LibraCornerFrontend';

  mainImage: string;
  
  faHeart = faAdd;
  faUser = faUser;
  faSearch = faSearch;

  constructor(
    private store: Store<AppState>,
    private localStorageService: LocalStorageService,
    private authService: AuthService
  ){
    this.mainImage = 'assets/images/footer.jpg'
  }

  ngOnInit(): void {
    this.store.dispatch(loadBooks());
    const token = this.localStorageService.getItem('authToken');
    if (token) {
      if (this.authService.isValidToken(token)) {
        const user = this.authService.getUserFromToken(token);
        this.store.dispatch(loginSuccess({ token, user }));
        this.store.dispatch(getUserToReadBooks({ userId: user.id }));
      } else {
        this.store.dispatch(logout());
      }
    }
  }
}
