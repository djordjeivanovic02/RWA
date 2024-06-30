import { Component, Input } from '@angular/core';
import { Book } from '../../models/book';
import { CommonModule } from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { faStar, faDownload, faBookReader} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-item',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.scss'
})
export class BookItemComponent {
  @Input()
  book?: Book;

  faStar = faStar;
  faDownload = faDownload;
  faBookReader = faBookReader;

  constructor(private router: Router) {}

  get truncatedTitle(): string {
    if (!this.book || !this.book.title) {
      return '';
    }
    return this.book.title.length > 18 
      ? this.book.title.slice(0, 18) + '...' 
      : this.book.title;
  }

  goToBookScreen(bookId: number): void{
    this.router.navigate(['/book', bookId])
  }
}
