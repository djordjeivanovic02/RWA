import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addNewBook } from '../../store/book/book.actions';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent {
  bookForm: FormGroup;
  selectedImage: File | null = null;
  selectedDocument: File | null = null;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      language: ['', Validators.required],
      genre: ['', Validators.required],
      image: [null, Validators.required],
      document: [null, Validators.required]
    });
  }

  onFileChange(event: Event, fileType: 'image' | 'document') {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (fileType === 'image') {
        this.selectedImage = file;
      } else if (fileType === 'document') {
        this.selectedDocument = file;
      }
      this.bookForm.patchValue({
        [fileType]: file
      });
    }
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const formData = new FormData();
      formData.append('title', this.bookForm.get('title')?.value);
      formData.append('description', this.bookForm.get('description')?.value);
      formData.append('language', this.bookForm.get('language')?.value);
      formData.append('genre', this.bookForm.get('genre')?.value);
      if (this.selectedImage) {
        formData.append('image', this.selectedImage);
      }
      if (this.selectedDocument) {
        formData.append('document', this.selectedDocument);
      }
      this.store.dispatch(addNewBook({ book: formData }));
      console.log('Form data:', formData);
    }
  }
}
