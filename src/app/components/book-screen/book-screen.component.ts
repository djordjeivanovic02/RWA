import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../app.state';
import { BookService } from '../../services/book.service';
import { selectBook } from '../../store/book/book.actions';
import { selectCurrentBook } from '../../store/book/book.selector';
import { faCheck, faClose, faDownload, faList } from '@fortawesome/free-solid-svg-icons';
import { createBookList, deleteBookList, getUserToReadBooks } from '../../store/booklist/booklist.actions';
import { Observable, map } from 'rxjs';
import { selectAuthUser } from '../../store/auth/auth.selector';
import { selectUserToReadBooks } from '../../store/booklist/booklist.selector';
import { FileDownloadService } from '../../services/file-download.service';

@Component({
  selector: 'app-book-screen',
  templateUrl: './book-screen.component.html',
  styleUrl: './book-screen.component.scss'
})
export class BookScreenComponent implements OnInit {
  book?: Book;
  bookId: number = -1;
  readedListId: number | undefined = -1;
  user$: Observable<any>;
  userId?: number;

  faClose = faClose;
  faCheck = faCheck;
  faDownload = faDownload;

  inToReadList: boolean = false;

  userToReadBooks$: Observable<Book[]>;
  toReadBooks: Book[] = [];

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private bookService: BookService,
    private fileDownloadService: FileDownloadService,
  ) {
    this.user$ = this.store.pipe(select(selectAuthUser))
    this.userToReadBooks$ = this.store.pipe(select(selectUserToReadBooks))
  }


  ngOnInit(): void {
    this.getBook();
    this.getUserId();
    this.getToReadBooks();

  }

  getBook(){
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      const parsedBookId = parseInt(bookId, 10);
      this.bookId = parsedBookId;
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

  get truncatedTitle(): string {
    if (!this.book || !this.book.description) {
      return '';
    }
    return this.book.description.length > 300 
      ? this.book.description.slice(0, 300) + '...' 
      : this.book.description;
  }

  addToReadingList(){
    const newBookListData = {
      type: 'to_read',
      user_id: this.userId,
      book_id: this.book?.id
    };

    this.store.dispatch(createBookList({ bookListData: newBookListData }));
    this.userToReadBooks$ = this.store.pipe(select(selectUserToReadBooks));
  }

  removeFromReadedList(){
    console.log(this.readedListId, this.userId);
    this.store.dispatch(deleteBookList({listId: this.readedListId, userId: this.userId}))
  }

  getUserId(){
    this.user$.subscribe(user => {
      if(user){
        this.userId = user.id;
        console.log("User ID: ", user.id);
      }
    });
  }

  getToReadBooks(){
    this.userToReadBooks$.subscribe(books => {
      if(books){
        const isBookInList = books.find(book => book.id === this.bookId);
        if(isBookInList){
          this.inToReadList = true;
          this.readedListId = isBookInList.id;
          console.log('Knjiga je već u listi za čitanje.');
        } else {
          this.inToReadList = false;
          console.log('Knjiga nije u listi za čitanje, možete je dodati.');
        }
  
        this.toReadBooks = books;
      }
    });
  }

  downloadPdf() {
    if(this.book?.document !== undefined){
    this.fileDownloadService.downloadPdf(this.book?.document).subscribe(
      (data: Blob) => {
        console.log(data);
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      },
      error => {
        console.error('Greška pri preuzimanju PDF-a:', error);
      }
    );
    }
  }
}
