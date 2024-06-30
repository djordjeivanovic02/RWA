import { Component } from '@angular/core';
import { BookListComponent } from '../book-list/book-list.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BookListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  mainImagePath: string;

  // user: User = {
  //   id: 1,
  //   name: "Laza",
  //   surname: "Lazarevic",
  //   email: "lazalazarevic@gmail.comd",
  //   about: "Ja sam laza lazarevic"
  // }

  // book: Book = {
  //   id: 1,
  //   title: "Prvi put s ocem na jutrenje",
  //   description: "Knjiga o ocu propalici i sinu",
  //   image: "https://static.kupindoslike.com/Laza-Lazarevic-Prvi-put-s-ocem-na-jutrenje_slika_O_92988461.jpg",
  //   author: this.user
  // }

  constructor(){
    this.mainImagePath = '/assets/images/main-image.png'
  }
}
