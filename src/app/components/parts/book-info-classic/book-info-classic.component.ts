import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-book-info-classic',
  templateUrl: './book-info-classic.component.html',
  styleUrl: './book-info-classic.component.scss'
})
export class BookInfoClassicComponent {
  @Input() mainColumn: string = '';
  @Input() infoColumn: string = '';
  @Input() isDecorated: boolean = false;
}
