import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BookItemComponent } from '../book-item/book-item.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { selectAllBooks } from '../../store/book/book.selector';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    BookItemComponent
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit{
  books: Book[] = [];

  constructor(private store: Store<AppState>){}

  ngOnInit(): void {
    this.store.select(selectAllBooks).pipe(
      map((books: Book[]) => {
        return books.map(book => ({
          id: book.id,
          author: book.author,
          title: book.title,
          image: "https://static.kupindoslike.com/Laza-Lazarevic-Prvi-put-s-ocem-na-jutrenje_slika_O_92988461.jpg"
        }));
      })
    ).subscribe((books) => {
      console.log(books);
      this.books = books;
    });
  }
}
