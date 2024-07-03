import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileDownloadService {

  private apiUrl = 'http://127.0.0.1:3000/';

  constructor(private http: HttpClient) { }

  downloadPdf(document: string): Observable<Blob> {
    const url = `${this.apiUrl}${document}`;

    return this.http.get(url, { responseType: 'blob' });
  }
}
