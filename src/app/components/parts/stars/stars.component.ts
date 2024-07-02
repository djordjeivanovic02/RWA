import { Component, Input } from '@angular/core';
import { faStar, faStarHalfAlt, faStar as faStarOutline } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrl: './stars.component.scss'
})
export class StarsComponent {
  @Input() rating: number = 4;
  faStar = faStar;
  faStarHalfAlt = faStarHalfAlt;
  faStarEmpty = faStarRegular;
  starsArray: any[] = [];

  ngOnInit() {
    this.generateStarsArray();
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
}
