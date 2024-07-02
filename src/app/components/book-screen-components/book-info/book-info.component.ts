import { Component, Input } from '@angular/core';
import { Book } from '../../../models/book.interface';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { BookService } from '../../../services/book.service';
import { selectBook } from '../../../store/book/book.actions';
import { selectCurrentBook } from '../../../store/book/book.selector';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrl: './book-info.component.scss'
})
export class BookInfoComponent {
  book?: Book;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private bookService: BookService
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
    }
  }
  showReviews: boolean = false;

  changeSelectedButton(result: boolean): void{
    this.showReviews = !this.showReviews;
  }
}
