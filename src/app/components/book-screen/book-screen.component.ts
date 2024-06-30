import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../models/book';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { selectBook } from '../../store/book/book.actions';
import { selectCurrentBook } from '../../store/book/book.selector';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-screen',
  standalone: true,
  imports: [],
  templateUrl: './book-screen.component.html',
  styleUrl: './book-screen.component.scss'
})
export class BookScreenComponent implements OnInit{
  book?: Book;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.store.dispatch(selectBook({ bookId: parseInt(bookId, 10) }));

      this.store.select(selectCurrentBook).subscribe((book) => {
        console.log("Knjiga: " + book?.title);
        if (!book) {
          this.bookService.getBook(parseInt(bookId, 10)).subscribe((book: Book) => {
            this.book = book;
          });
        } else {
          this.book = book;
        }
      });
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
