import { Component, Input } from '@angular/core';
import { faList, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-book-actions',
  templateUrl: './book-actions.component.html',
  styleUrl: './book-actions.component.scss'
})
export class BookActionsComponent {
  @Input() textValue: string = '';
  @Input() isReverse: boolean = false;

  faList = faList;
  faCheck = faCheck;
}
