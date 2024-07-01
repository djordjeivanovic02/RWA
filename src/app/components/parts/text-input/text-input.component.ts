import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss'
})
export class TextInputComponent {
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Output() valueChange = new EventEmitter<string>();

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.valueChange.emit(inputElement.value);
  }
}
