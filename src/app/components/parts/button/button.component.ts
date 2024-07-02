import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() textValue: string = '';
  @Input() isActive: boolean = true;
  @Output() clicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  onClick(event: Event): void {
    this.clicked.emit(true);
  }
}
