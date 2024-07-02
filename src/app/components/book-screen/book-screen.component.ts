import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { BookService } from '../../services/book.service';
import { selectBook } from '../../store/book/book.actions';
import { selectCurrentBook } from '../../store/book/book.selector';

@Component({
  selector: 'app-book-screen',
  templateUrl: './book-screen.component.html',
  styleUrl: './book-screen.component.scss'
})
export class BookScreenComponent implements OnInit {
  book?: Book;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private bookService: BookService,
    private router: Router
  ) {}


  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      const parsedBookId = parseInt(bookId, 10);
      this.store.dispatch(selectBook({ bookId: parsedBookId }));

      this.store.select(selectCurrentBook).subscribe((book) => {
        if (!book) {
          this.bookService.getBook(parsedBookId).subscribe((fetchedBook: Book) => {
            this.book = fetchedBook;
          });
        } else {
          this.book = book;
        }
      });
      console.log(this.book);
    }
  }

  get truncatedTitle(): string {
    if (!this.book || !this.book.description) {
      return '';
    }
    return this.book.description.length > 300 
      ? this.book.description.slice(0, 300) + '...' 
      : this.book.description;
  }
}
