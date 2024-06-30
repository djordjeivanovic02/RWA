import { Component, Input, Output, EventEmitter} from '@angular/core';
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

  @Output()
  selektovan: EventEmitter<number> = new EventEmitter<number>();

  constructor(private router: Router) {}

  onRedirectClick(ev: Event){
    if(this.book){
      this.selektovan.emit(this.book.id);
    }
  }

  faStar = faStar;
  faDownload = faDownload;
  faBookReader = faBookReader;


  get truncatedTitle(): string {
    if (!this.book || !this.book.title) {
      return '';
    }
    return this.book.title.length > 18 
      ? this.book.title.slice(0, 18) + '...' 
      : this.book.title;
  }


}
