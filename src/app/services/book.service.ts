import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getBooks(): Observable<Book[]>{
    return this.httpClient.get<Book[]>(`${this.baseUrl}/book`);
  }
  getBook(id: number): Observable<Book>{
    return this.httpClient.get<Book>(`${this.baseUrl}/book/${id}`);
  }
  addBook(bookData: FormData): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/book`, bookData);
  }
}
