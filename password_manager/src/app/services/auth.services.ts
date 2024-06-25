import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { loginRegister } from '../models/loginRegister.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_KEY = 'isAuthenticated';

  constructor(private router: Router) {}

  login() {
    localStorage.setItem(this.AUTH_KEY, 'true');
  }

  logout(dataLogin:loginRegister|null) {
    dataLogin=null;
    localStorage.removeItem(this.AUTH_KEY);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.AUTH_KEY) === 'true';
  }
}

