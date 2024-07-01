import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../models/book.interface';
import { Router } from '@angular/router';
import { faStar, faDownload, faBookReader} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-book-item',
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
