import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Rate } from '../models/rate.interface';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  addRate(rating: any): Observable<Rate> {
    return this.http.post<Rate>(`${this.apiUrl}/rate`, rating);
  }

  updateRating(rating: Rate, rateId: number): Observable<Rate> {
    return this.http.put<Rate>(`${this.apiUrl}/rate/${rateId}`, rating);
  }
}
