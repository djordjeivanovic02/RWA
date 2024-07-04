import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app.state';
import { Store, select } from '@ngrx/store';
import { logout } from '../../store/auth/auth.actions';
import { EMPTY, Observable } from 'rxjs';
import { selectAuthUser } from '../../store/auth/auth.selector';
import { Book } from '../../models/book.interface';
import { getUserToReadBooks } from '../../store/booklist/booklist.actions';
import { selectUserToReadBooks } from '../../store/booklist/booklist.selector';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  mainImagePath: string;
  user$: Observable<User>;

  user: User | null = null;
  // addedBooks$: Observable<Book[]>;
  savedBooks$: Observable<Book[]>;

  constructor(private store: Store<AppState>){
    this.mainImagePath = '/assets/images/profile.svg';
    this.user$ = this.store.pipe(select(selectAuthUser));
    this.savedBooks$ = EMPTY;
  }

  ngOnInit(): void {
    this.user$.subscribe(user => {
      if (user) {
        this.user = user;
        const userId = user.id;
        // this.addedBooks$ = this.store.pipe(select(selectUserAddedBooks, { userId }));
        this.savedBooks$ = this.store.pipe(select(selectUserToReadBooks));
        this.savedBooks$.subscribe(x => console.log(x));
        // this.store.dispatch(loadUserBooks({ userId }));
        console.log(user);
      }
    });
  }

  onLogout() {
    this.store.dispatch(logout());
  }
}
