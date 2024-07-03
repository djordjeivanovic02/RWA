import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode, JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = "http://127.0.0.1:3000";

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>((`${this.baseUrl}/auth/login`), { username, password });
  }

  register(name: string, surname: string, email: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/auth/register`, { name, surname, email, password });
  }

  decodeToken(token: string): JwtPayload | null {
    try {
      return jwtDecode<JwtPayload>(token);
    } catch (error) {
      console.error('Invalid token format', error);
      return null;
    }
  }

  isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) {
      return true;
    }
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(decoded.exp);
    return expirationDate < new Date();
  }

  isValidToken(token: string): boolean {
    return !this.isTokenExpired(token);
  }
}
