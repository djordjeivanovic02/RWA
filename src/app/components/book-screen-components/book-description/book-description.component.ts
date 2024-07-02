import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-book-description',
  templateUrl: './book-description.component.html',
  styleUrl: './book-description.component.scss'
})
export class BookDescriptionComponent {
  @Input() description: string | undefined = '';
}
