import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Book } from '../../../models/book.interface';

@Component({
  selector: 'app-quickbook',
  templateUrl: './quickbook.component.html',
  styleUrl: './quickbook.component.scss'
})
export class QuickbookComponent {
  @Input() book: Book | undefined;

  mainImagePath: string;
  constructor(private store: Store){
    this.mainImagePath = '/assets/images/profile.svg'
  }

  get truncatedTitle(): string {
    if (!this.book || !this.book.description) {
      return '';
    }
    return this.book.description.length > 70 
      ? this.book.description.slice(0, 70) + '...' 
      : this.book.description;
  }
}
