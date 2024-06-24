// auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private tokenKey: string = 'authToken';
    constructor(private http: HttpClient, private router: Router) {}

    login(email: string, password: string): Observable<any> {
        
      return this.http.post<any>('/api/auth/login', { email, password })
        .pipe(
          tap(response => {
            if (response && response.token) {
              this.setToken(response.token);
            }
          })
        );
    }
  
    logout(): void {
      this.clearToken();
      this.router.navigate(['/login']);
    }
  
    setToken(token: string): void {
      localStorage.setItem(this.tokenKey, token);
    }
  
    getToken(): string | null {
      return localStorage.getItem(this.tokenKey);
    }
  
    clearToken(): void {
      localStorage.removeItem(this.tokenKey);
    }
  
    isLoggedIn(): boolean {
      return this.getToken() !== null;
    }
  }
  
