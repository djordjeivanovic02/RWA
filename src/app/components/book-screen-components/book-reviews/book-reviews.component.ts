import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Rate } from '../../../models/rate.interface';
import { Comment } from '../../../models/comment.interface';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { Store } from '@ngrx/store';
import { RatingService } from '../../../services/rating.service';
import { updateRating } from '../../../store/rating/rating.actions';
import { selectCurrentBook } from '../../../store/book/book.selector';
import { BookService } from '../../../services/book.service';
import { ActivatedRoute } from '@angular/router';
import { loadBooks, selectBook } from '../../../store/book/book.actions';
import { Book } from '../../../models/book.interface';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-book-reviews',
  templateUrl: './book-reviews.component.html',
  styleUrls: ['./book-reviews.component.scss']
})
export class BookReviewsComponent implements OnInit {
  @Input() rates: Rate[] | undefined = [];
  @Input() comments: Comment[] = [];
  @Input() userId: number | undefined = 0;


  @Output() changed: EventEmitter<boolean> = new EventEmitter<boolean>();

  bookId: number = 0;
  book?: Book;
  myRate: Rate | null= null;

  averageRate: number = 0;
  rating: number = 0;

  faStar = faStar;
  faStarHalfAlt = faStarHalfAlt;
  faStarEmpty = faStarRegular;
  starsArray: any[] = [];
  
  constructor(
    private store: Store,
    private ratingService: RatingService,
    private bookService: BookService,
    private route: ActivatedRoute,
  ) {}
  
  ngOnInit(): void {
    this.calculateAverageRate();
    this.generateStarsArray();
    this.getBook();
    this.getMyRate();
  }

  getMyRate() {
    if (this.rates && this.userId) {
      const myRate = this.rates.find(rate => rate.user.id === this.userId);
      if (myRate) {
        this.rating = myRate.rate;
        this.myRate = myRate;
        this.generateStarsArray();
      }
    }
  }
  getBook(){
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      const parsedBookId = parseInt(bookId, 10);
      this.bookId = parsedBookId;
      this.store.dispatch(selectBook({ bookId: parsedBookId }));

      this.store.select(selectCurrentBook).subscribe((book) => {
        if (!book) {
          this.bookService.getBook(parsedBookId).subscribe((fetchedBook: Book) => {
            this.book = fetchedBook;
          });
        } else {
          this.book = book;
        }
        console.log(this.book);
      });
    }
  }

  calculateAverageRate() {
    if (this.rates !== undefined && this.rates.length > 0) {
      let sum: number = 0;
      this.rates.forEach(rate => {
        sum += rate.rate;
      });
      this.averageRate = sum / this.rates.length;
    }
  }

  generateStarsArray() {
    this.starsArray = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(this.rating)) {
        this.starsArray.push(this.faStar);
      } else if (i === Math.ceil(this.rating) && this.rating % 1 !== 0) {
        this.starsArray.push(this.faStarHalfAlt);
      } else {
        this.starsArray.push(this.faStarEmpty);
      }
    }
  }

  rate(rating: number): void {
    this.rating = rating;
    this.generateStarsArray();
    if(this.userId != undefined){
      if(this.myRate){
        let newRate:Rate = {
          id: this.myRate.id,
          rate: this.rating,
          user: this.myRate.user,
          book: this.book!!
        };
        this.ratingService.updateRating(newRate, newRate.id).subscribe(updatedRating => {
          this.store.dispatch(updateRating({ rating: updatedRating, userId: newRate.id }));
        }, error => {
          console.error('Greška prilikom ažuriranja ocene:', error);
        });
      }else{
        const newRating = {
          rate: rating,
          user_id: this.userId,
          book_id: this.bookId
        };
        this.ratingService.addRate(newRating).subscribe(updatedRating => {
          this.store.dispatch(updateRating({ rating: updatedRating, userId: this.myRate?.id!!}));
        }, error => {
          console.error('Greška prilikom ažuriranja ocene:', error);
        });
      }
      this.refreshBooks();
      this.calculateAverageRate();
      this.changed.emit();
    }
  }

  refreshBooks() {
    this.store.dispatch(loadBooks());
  }
}
