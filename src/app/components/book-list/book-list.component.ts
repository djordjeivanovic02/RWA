import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { selectAllBooks } from '../../store/book/book.selector';
import { map } from 'rxjs';
import { selectBook } from '../../store/book/book.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit{
  books: Book[] = [];

  constructor(private store: Store<AppState>, private router: Router){}

  ngOnInit(): void {
    this.store.select(selectAllBooks).pipe(
      map((books: Book[]) => {
        return books.map(book => {
          let averageRate = 0.0;
          if(book.rates !== undefined && book.rates.length > 0){
            averageRate = book.rates.reduce((sum, r) => sum + r.rate, 0) / book.rates.length;
          }
          return {
            id: book.id,
            author: book.author,
            averageRate: averageRate,
            image: "http://127.0.0.1:3000/" + book.image,
            title: book.title,
          };
        });
      })
    ).subscribe((books) => {
      this.books = books;
    });
  }

  onSelect(bookId: number) {
    this.store.dispatch(selectBook({ bookId: bookId }));
    this.router.navigate(['book/', bookId]);
  }
}