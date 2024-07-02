import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-average-rate',
  templateUrl: './average-rate.component.html',
  styleUrl: './average-rate.component.scss'
})
export class AverageRateComponent {
  @Input() rating: number = 0;
  @Input() rateNumber: number | undefined = 0;
}
