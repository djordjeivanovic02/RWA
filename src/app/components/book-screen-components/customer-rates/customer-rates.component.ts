import { Component, Input, OnInit } from '@angular/core';
import { Rate } from '../../../models/rate.interface';
import { BehaviorSubject, map } from 'rxjs';

@Component({
  selector: 'app-customer-rates',
  templateUrl: './customer-rates.component.html',
  styleUrl: './customer-rates.component.scss'
})
export class CustomerRatesComponent implements OnInit {
  private ratesSubject = new BehaviorSubject<Rate[]>([]);
  rates$ = this.ratesSubject.asObservable();
  ratesNumber: number = 0;

  rateCounts$ = this.rates$.pipe(
    map(rates => {
      const counts = new Array(5).fill(0);
      rates.forEach(rate => {
        if (rate.rate >= 1 && rate.rate <= 5) {
          counts[Math.floor(rate.rate) - 1]++;
        }
      });
      return counts;
    })
  );

  @Input() set rates(rates: Rate[] | undefined) {
    this.ratesNumber = rates?.length ?? 0;
    this.ratesSubject.next(rates || []);
  }
  ngOnInit(): void {
    
  }
}
