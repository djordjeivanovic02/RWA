import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { faList, faCheck, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-book-actions',
  templateUrl: './book-actions.component.html',
  styleUrl: './book-actions.component.scss'
})
export class BookActionsComponent {
  @Input() textValue: string = '';
  @Input() isReverse: boolean = false;
  @Input() icon: IconDefinition = faList;

  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  emitButtonClick(){
    this.buttonClick.emit();
  }
}
