import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { faHeart, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import { BookService } from './services/book.service';
import { HttpClientModule } from "@angular/common/http";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FontAwesomeModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'LibraCornerFrontend';
  
  faHeart = faHeart;
  faUser = faUser;
  faSearch = faSearch;
}
