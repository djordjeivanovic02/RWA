import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BookList } from '../models/booklist.interface';

@Injectable({
  providedIn: 'root'
})
export class BooklistService {
  private apiUrl = `${environment.apiUrl}/booklist`;

  constructor(private http: HttpClient) { }

  createBookList(bookListData: any): Observable<BookList> {
    console.log(bookListData);
    return this.http.post<BookList>(`${this.apiUrl}`, bookListData);
  }

  getUserReadedBooks(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}/userReaded`);
  }

  getUserToReadBooks(userId: number | undefined): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}/userToRead`);
  }

  deleteBookListStatus(id: number | undefined): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  deleteBookListStatusByUser(bookId: number | undefined, userId: number | undefined): Observable<any> {
    console.log("tU sam")
    return this.http.delete<any>(`${this.apiUrl}/${bookId}/${userId}`);
  }


}