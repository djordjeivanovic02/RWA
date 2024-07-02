import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss'
})
export class TextInputComponent {
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() isPassword: boolean = false;
  @Output() valueChange = new EventEmitter<string>();

  faShowing = faEye;
  faHiddening = faEyeSlash;

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.valueChange.emit(inputElement.value);
  }

  changeState(){
    if(this.type === 'text') this.type = 'password';
    else this.type = 'text';
  }
}
