import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-screen',
  standalone: true,
  imports: [],
  templateUrl: './book-screen.component.html',
  styleUrl: './book-screen.component.scss'
})
export class BookScreenComponent implements OnInit{
  bookId: string;
  
  constructor(private route: ActivatedRoute) {
    this.bookId = "";
  }

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id')!!;
  }
}
