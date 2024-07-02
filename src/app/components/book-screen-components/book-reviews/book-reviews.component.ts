import { Component, Input, OnInit } from '@angular/core';
import { Rate } from '../../../models/rate.interface';

@Component({
  selector: 'app-book-reviews',
  templateUrl: './book-reviews.component.html',
  styleUrl: './book-reviews.component.scss'
})
export class BookReviewsComponent implements OnInit {
  @Input() rates: Rate[] | undefined = [];
  averageRate: number = 0;

  ngOnInit(): void {
    this.calculateAverageRate();
  }

  calculateAverageRate(){
    if(this.rates !== undefined){
      let sum: number = 0;
      this.rates.forEach(rate => {
        sum += rate.rate
      });
      this.averageRate = sum / this.rates.length;
    }
  }
}
