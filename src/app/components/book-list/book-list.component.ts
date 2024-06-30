import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BookItemComponent } from '../book-item/book-item.component';

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

  constructor(private bookService: BookService){}

  ngOnInit(): void {
    this.bookService.getBooks().pipe(
      map((books: Book[]) => {
        return books.map(book => ({
          id: book.id,
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
